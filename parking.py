#!/usr/bin/env python3

import sys
import time
import socket
import random
import string
import datetime
import requests
import threading
from escpos.printer import Network
from requests.auth import HTTPDigestAuth
import os
import logging

API_URL = 'http://localhost/api'
LOCATION = False

def get_location():
    attempt = 0
    while True:
        attempt += 1
        try:
            r = requests.get(API_URL + '/locationIdentity/search', params={'active': 1}, timeout=3)
        except Exception as e:
            logging.error('Failed to get location ' + str(e))
            time.sleep(3)
            if attempt == 10:
                return False

        if r.status_code == 200:
            return r.json()

        return False

def get_gates():
    try:
        r = requests.get(API_URL + '/parkingGate/search', params={'type': 'IN'}, timeout=3)
    except Exception as e:
        logging.error('Failed to get gates ' + str(e))
        return False

    if r.status_code == 200:
        return r.json()

    return False

def take_snapshot(gate):
    if gate['camera_status'] == 0:
        logging.info(gate['name'] + ' : Not taking snapshot. Camera not active')
        return ''

    try:
        r = requests.get(API_URL + '/parkingGate/takeSnapshot/' + str(gate['id']))

        if r.status_code != 200:
            logging.error(gate['name'] + ' : Failed to take snapshot. Status code : ' + r.status_code)
            send_notification(gate, "Gagal mengambil snapshot di gate " + gate['name'] + ". Status Code : " + r.status_code)
            return ''

        respons = r.json()
        return respons['filename']
    except Exception as e:
        logging.error(gate['name'] + ' : Failed to take snapshot ' + str(e))
        send_notification(gate, "Gagal mengambil snapshot di gate " + gate['name'] + " (" + str(e) + ")")
        return ''

def generate_barcode_number():
    return ''.join([random.choice(string.ascii_uppercase + string.digits) for n in range(5)])

def print_ticket_network(gate, data):
    try:
        p = Network(gate['printer_ip_address'])
    except Exception as e:
        logging.error(gate['name'] + ' : Failed to print ticket ' + data['barcode_number'] + ' ' + str(e))
        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' gagal print tiket. Informasikan nomor barcode kepada pengunjung. ' + data['barcode_number'])
        return

    try:
        p.set(align='center')
        p.text("TIKET PARKIR\n")
        p.set(height=2, align='center')
        p.text(LOCATION['name'] + "\n\n")
        p.set(align='left')
        p.text('GATE         : ' + gate['name'] + "/" + gate['vehicle_type'] + "\n")
        p.text('TANGGAL      : ' + datetime.datetime.strptime(data['time_in'][:10], '%Y-%m-%d').strftime('%d %b %Y') + "\n")
        p.text('JAM          : ' + data['time_in'][11:] + "\n\n")
        p.set(align='center')
        p.barcode(data['barcode_number'], 'CODE39', function_type='A', height=100, width=4, pos='BELOW', align_ct=True)
        p.text("\n")
        p.text(LOCATION['additional_info_ticket'])
        p.cut()
    except Exception as e:
        logging.error(gate['name'] + ' : Failed to print ticket ' + data['barcode_number'] + ' ' + str(e))
        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' gagal print tiket. Informasikan nomor barcode kepada pengunjung. ' + data['barcode_number'])
        return

    logging.info(gate['name'] + ' : Ticket printed ' + data['barcode_number'])

def print_ticket_serial(gate, data, s):
    command = [
        '\xa6PR4', # start print command, baudrate 9600
        '\x1b\x61\x01TIKET PARKIR\n', # align center
        '\x1b\x21\x10' + LOCATION['name'] +'\n\n', # double height
        '\x1b\x21\x00', # normal height
        '\x1b\x61\x00', # align left
        'GATE         : ' + gate['name'] + '/' +  gate['vehicle_type'] + '\n',
        'TANGGAL      : ' + datetime.datetime.strptime(data['time_in'][:10], '%Y-%m-%d').strftime('%d %b %Y') + '\n',
        'JAM          : ' + data['time_in'][11:] + '\n\n',
        '\x1b\x61\x01', # align center
        '\x1dhd', # set barcode height = 100, GS h 100
        '\x1dH\x02', # set barcode text = below, GS H 2
        '\x1dkE', # GS k 69
        chr(len(data['barcode_number'])), # barcode length
        data['barcode_number'], # barcode content
        '\n' + LOCATION['additional_info_ticket'] + '\n',
        '\x1d\x56A', # full cut, add 3 lines: GS V 65
        '\xa9' # end command
    ]

    try:
        s.sendall(str.encode(''.join(command)))
        logging.debug(gate['name'] + ' : ' + str(s.recv(1024)))
    except Exception as e:
        logging.error(gate['name'] + ' : Failed to print ticket ' + data['barcode_number'] + ' ' + str(e))
        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' gagal print tiket. Informasikan nomor barcode kepada pengunjung. ' + data['barcode_number'])
        return

    logging.info(gate['name'] + ' : Ticket printed ' + data['barcode_number'])

def send_notification(gate, message):
    notification = { 'parking_gate_id': gate['id'], 'message': message }
    try:
        requests.post(API_URL + '/notification', data=notification, timeout=3)
    except Exception as e:
        logging.info(gate['name'] + ' : Failed to send notification ' + str(e))
        return False

    try:
        data = { 'text': LOCATION['name'] + ' - ' + message, 'chat_id': 527538821 }
        requests.post('https://api.telegram.org/bot682525135:AAH5H-rqnDlyODgWzNpKiUZGszGz9Oys49g/sendMessage', data=data, timeout=3)
    except Exception:
        pass

    return True

def check_card(gate, card_number):
    payload = { 'card_number': card_number, 'active': 1 }
    try:
        r = requests.get(API_URL + '/parkingMember/search', params=payload, timeout=3)
    except Exception as e:
        logging.info(gate['name'] + ' : Failed to check card ' + str(e))
        return False

    if r.status_code == 200:
        return r.json()

    return False

def save_data(gate, data):
    try:
        r = requests.post(API_URL + '/parkingTransaction', data=data, timeout=3)
    except Exception as e:
        logging.info(gate['name'] + ' : Failed to save data ' + str(e))
        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda (gagal menyimpan data)')
        return False

    return r.json()

def gate_in_thread(gate):
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(3)

            logging.info(gate['name'] + ' : Connecting to ' + gate['controller_ip_address'] + ':' + str(gate['controller_port']))

            try:
                s.connect((gate['controller_ip_address'], gate['controller_port']))
            except Exception:
                time.sleep(3)
                continue

            logging.info(gate['name'] + ' : CONNECTED')
            send_notification(gate, gate['name'] + ' Terhubung')

            while True:
                try:
                    s.sendall(b'\xa6STAT\xa9')
                    vehicle_detection = s.recv(1024)
                except Exception as e:
                    logging.error(gate['name'] + ' : Failed to detect vehicle ' + str(e))
                    send_notification(gate, gate['name'] + ' : Gagal deteksi kendaraan')
                    # keluar dari loop cek kendaraan untuk sambung ulang controller
                    break

                logging.debug(gate['name'] + ' : ' + str(vehicle_detection))

                if b'IN1ON' in vehicle_detection or b'STAT1' in vehicle_detection:
                    logging.info(gate['name'] + ' : Vehicle detected')

                    # play selamat datang
                    try:
                        s.sendall(b'\xa6MT00007\xa9')
                        logging.debug(gate['name'] + ' : ' + str(s.recv(1024)))
                    except Exception as e:
                        logging.error(gate['name'] + ' : Failed to play Selamat Datang ' + str(e))
                        send_notification(gate, gate['name'] + ' : Gagal play Selamat Datang ')
                        # keluar dari loop cek kendaraan untuk sambung ulang controller
                        break
                else:
                    time.sleep(1)
                    continue

                reset = False
                error = False

                # detect push button or card
                while True:
                    try:
                        s.sendall(b'\xa6STAT\xa9')
                        push_button_or_card = s.recv(1024)
                    except Exception:
                        logging.error(gate['name'] + ' : Failed to sense button and card')
                        send_notification(gate, gate['name'] + ' : Gagal mendeteksi tombol tiket')
                        error = True
                        break

                    logging.debug(gate['name'] + ' : ' + str(push_button_or_card))

                    if b'W' in push_button_or_card:
                        card_number = str(push_button_or_card).split('W')[1].split('\\xa9')[0]
                        member = check_card(gate, str(int(card_number, 16)))

                        if not member:
                            try:
                                s.sendall(b'\xa6MT00003\xa9')
                            except Exception as e:
                                logging.error(gate['name'] + ' : Failed to respon invalid card ' + str(e))
                                send_notification(gate, gate['name'] + ' : Gagal merespon kartu invalid')
                                error = True
                                break

                            continue

                        data = {'is_member': 1, 'card_number': member['card_number'], 'parking_member_id': member['id']}
                        logging.info(gate['name'] + ' : Card detected :' + member['card_number'])
                        break

                    elif b'IN2ON' in push_button_or_card or b'STAT11' in push_button_or_card:
                        logging.info(gate['name'] + ' : Ticket button pressed')
                        data = {'is_member': 0}
                        break

                    elif b'IN3' in push_button_or_card:
                        logging.info(gate['name'] + ' : Reset')
                        reset = True
                        break

                    elif b'IN4ON' in push_button_or_card:
                        reset = True
                        try:
                            s.sendall(b'\xa6MT00005\xa9')
                        except Exception as e:
                            logging.error(gate['name'] + ' : Failed to respon help button ' + str(e))
                            send_notification(gate, gate['name'] + ' : Gagal merespon tombol bantuan')
                            error = True
                            break

                        logging.info(gate['name'] + ' : Help button pressed')
                        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda')
                        break

                    elif b'IN1OFF' in push_button_or_card:
                        logging.info(gate['name'] + ' : Vehicle turn back')
                        reset = True
                        break

                    else:
                        # delay 1 detik baru cek lagi status button
                        time.sleep(1)

                # END LOOP SENSING BUTTON OR CARD WHEN VEHICLE DETECTED

                # kalau error keluar dari loop cek kendaraan biar sambung ulang controller
                if error:
                    break

                # kalau reset kembali ke loop cek kendaraan
                if reset:
                    continue

                # lengkapi data kemudian simpan
                data['gate_in_id'] = gate['id']
                data['time_in'] = time.strftime('%Y-%m-%d %T')
                data['vehicle_type'] = gate['vehicle_type']
                data['barcode_number'] = generate_barcode_number()
                data['snapshot_in'] = take_snapshot(gate)
                save_data(gate, data)

                # kalau bukan member cetak struk
                if data['is_member'] == 0:
                    if gate['printer_type'] == 'network':
                        print_ticket_network(gate, data)
                    elif gate['printer_type'] == 'local':
                        print_ticket_serial(gate, data, s)

                    # play silakan ambil tiket
                    try:
                        s.sendall(b'\xa6MT00002\xa9')
                        logging.debug(gate['name'] + ' : ' + str(s.recv(1024)))
                    except Exception as e:
                        logging.error(gate['name'] + ' : Failed to play silakan ambil tiket' + str(e))
                        send_notification(gate, gate['name'] + ' : Gagal play silakan ambil tiket')
                        break

                # play terimakasih
                try:
                    s.sendall(b'\xa6MT00006\xa9')
                    logging.debug(gate['name'] + ' : ' + str(s.recv(1024)))
                except Exception:
                    logging.error(gate['name'] + ' : Failed to play terimakasih' + str(e))
                    send_notification(gate, gate['name'] + ' : Gagal play terimakasih')
                    break

                time.sleep(1)

                # open gate
                try:
                    s.sendall(b'\xa6OPEN1\xa9')
                    logging.debug(gate['name'] + ' : ' + str(s.recv(1024)))
                except Exception as e:
                    logging.error(gate['name'] + ' : Failed to open gate ' + str(e))
                    send_notification(gate, gate['name'] + ' : Gagal membuka gate')
                    break

                logging.info(gate['name'] + ' : Gate Opened')

                # wait until vehicle in
                counter = 0

                while True:
                    # 5x cek aja biar ga kelamaan
                    if counter > 5:
                        logging.info(gate['name'] + ' : Waiting too long')
                        break

                    counter += 1

                    try:
                        s.sendall(b'\xa6STAT\xa9')
                        vehicle_in = s.recv(1024)
                        logging.debug(gate['name'] + ' : ' + str(vehicle_in))
                    except Exception as e:
                        logging.error(gate['name'] + ' : Failed to sense loop 2 ' + str(e))
                        send_notification(gate, gate['name'] + ' : Gagal deteksi kendaraan sudah masuk')
                        error = True
                        # break sensing loop 2
                        break

                    if b'IN3OFF' in vehicle_in:
                        logging.info(gate['name'] + ' : Vehicle in')
                        break

                    time.sleep(3)

                if error:
                    # break loop cek kendaraan, sambung ulang controller
                    break

def start_app():
    global LOCATION
    LOCATION = get_location()

    if LOCATION == False:
        logging.info('Location not set. Exit application.')
        sys.exit()

    logging.info('Location set: ' + LOCATION['name'])

    gates = get_gates()

    if gates == False:
        logging.info('Gate not set. Exit application.')
        sys.exit()

    logging.info('Gate set : ' + ', '.join(map(lambda x: x['name'], gates)))
    logging.info('Starting application...')

    for g in gates:
        threading.Thread(target=gate_in_thread, args=(g,)).start()

if __name__ == "__main__":
    # log_file = os.path.join(os.path.dirname(__file__), "parking.log")
    log_file = '/var/log/parking.log'
    logging.basicConfig(filename=log_file, filemode='a', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    start_app()
