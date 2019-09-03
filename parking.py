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
GATES = False
DISCONNECT_GATE = False
GATE_SOCKET = {}

def get_location():
    try:
        r = requests.get(API_URL + '/locationIdentity/search', params={'active': 1}, timeout=3)
        return r.json()
    except Exception as e:
        logging.error('Failed to get location ' + str(e))
        return False

def get_gates():
    try:
        r = requests.get(API_URL + '/parkingGate/search', params={'type': 'IN'}, timeout=3)
        return r.json()
    except Exception as e:
        logging.error('Failed to get gates ' + str(e))
        return False

def take_snapshot(gate):
    if gate['camera_status'] == 0:
        return ''

    try:
        output_file_name = 'snapshot/' + time.strftime('%Y%m%d%H%M%S') + '.jpg'
        if gate['camera_auth_type'] == 'digest':
            r = requests.get(gate['camera_image_snapshot_url'], auth=HTTPDigestAuth(gate['camera_username'], gate['camera_password']), timeout=3)
        else:
            r = requests.get(gate['camera_image_snapshot_url'], auth=(gate['camera_username'], gate['camera_password']), timeout=3)
    except Exception as e:
        logging.error(gate['name'] + ' : Failed to take snapshot ' + str(e))
        send_notification(gate, "Gagal mengambil snapshot di gate " + gate['name'] + " (" + str(e) + ")")
        return ''

    if r.status_code == 200 and r.headers['content-type'] =='image/jpeg':
        # with open(os.path.join(os.path.dirname(__file__), "public/" + output_file_name), 'wb') as f:
        with open('./public/' + output_file_name, 'wb') as f:
            for chunk in r:
                f.write(chunk)

        return output_file_name
    else:
        logging.error(gate['name'] + ' : Failed to take snapshot ' + str(r.status_code))
        send_notification(gate, "Gagal mengambil snapshot di gate " + gate['name'] + " (error " + str(r.status_code) + ")")
        return ''

def generate_barcode_number():
    return ''.join([random.choice(string.ascii_uppercase + string.digits) for n in range(5)])

# assume semua pake printer network
def print_ticket(trx_data, gate):
    try:
        p = Network(gate['printer_ip_address'])
    except Exception as e:
        logging.error(gate['name'] + ' : Failed to print ticket ' + trx_data['barcode_number'] + ' ' + str(e))
        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' gagal print tiket. Informasikan nomor barcode kepada pengunjung. ' + trx_data['barcode_number'])
        return

    try:
        p.set(align='center')
        p.text("TIKET PARKIR\n")
        p.set(height=2, align='center')
        p.text(LOCATION['name'] + "\n\n")
        p.set(align='left')
        p.text('GATE'.ljust(10) + ' : ' + gate['name'] + "/" + gate['vehicle_type'] + "\n")
        p.text('TANGGAL'.ljust(10) + ' : ' + datetime.datetime.strptime(trx_data['time_in'][:10], '%Y-%m-%d').strftime('%d %b %Y') + "\n")
        p.text('JAM'.ljust(10) + ' : ' + trx_data['time_in'][11:] + "\n\n")
        p.set(align='center')
        p.barcode(trx_data['barcode_number'], 'CODE39', function_type='A', height=100, width=4, pos='BELOW', align_ct=True)
        p.text("\n")
        p.text(LOCATION['additional_info_ticket'])
        p.cut()
    except Exception as e:
        logging.error(gate['name'] + ' : Failed to print ticket ' + trx_data['barcode_number'] + ' ' + str(e))
        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' gagal print tiket. Informasikan nomor barcode kepada pengunjung. ' + trx_data['barcode_number'])
        return

    logging.info(gate['name'] + ' : Ticket printed ' + trx_data['barcode_number'])

def send_notification(gate, message):
    notification = { 'parking_gate_id': gate['id'], 'message': message }
    try:
        requests.post(API_URL + '/notification', data=notification, timeout=3)
    except Exception as e:
        logging.info(gate['name'] + ' : Failed to send notification ' + str(e))
        return False

    return True

def check_card(gate, card_number):
    payload = { 'card_number': card_number, 'active': 1 }
    try:
        r = requests.get(API_URL + '/parkingMember/', params=payload, timeout=3)
    except Exception as e:
        logging.info(gate['name'] + ' : Failed to check card ' + str(e))
        return False

    return r.json()

def save_data(gate, data):
    try:
        r = requests.post(API_URL + '/parkingTransaction', data=data, timeout=3)
    except Exception as e:
        logging.info(gate['name'] + ' : Failed to save data ' + str(e))
        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda (gagal menyimpan data)')
        return False

    return r.json()

def gate_in_thread(gate):
    global DISCONNECT_GATE
    global GATE_SOCKET

    while True:
        if DISCONNECT_GATE:
            break

        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(3)

            logging.info(gate['name'] + ' : Connecting to ' + gate['controller_ip_address'] + ':' + str(gate['controller_port']))

            try:
                s.connect((gate['controller_ip_address'], gate['controller_port']))
            except Exception:
                time.sleep(3)
                continue

            GATE_SOCKET[gate['id']] = s
            logging.info(gate['name'] + ' : CONNECTED')
            send_notification(gate, gate['name'] + ' CONNECTED')

            while True:
                try:
                    s.sendall(b'\xa6STAT\xa9')
                    vehicle_detection = s.recv(1024)
                except Exception as e:
                    logging.error(gate['name'] + ' : Failed to detect vehicle ' + str(e))
                    # keluar dari loop cek kendaraan untuk sambung ulang controller
                    break

                if b'IN1ON' in vehicle_detection or b'STAT1' in vehicle_detection:
                    logging.info(gate['name'] + ' : Vehicle detected')

                    # play selamat datang
                    try:
                        s.sendall(b'\xa6MT00007\xa9')
                    except Exception as e:
                        logging.error(gate['name'] + ' : Failed to play Selamat Datang ' + str(e))
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
                        error = True
                        break

                    if b'W' in push_button_or_card:
                        card_number = push_button_or_card[3:-1]
                        valid_card = check_card(gate, card_number)

                        if not valid_card:
                            continue

                        data = {'is_member': 1, 'card_number': card_number}
                        logging.info(gate['name'] + ' : Card detected :' + card_number)
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
                            error = True
                            break

                        logging.info(gate['name'] + ' : Help button pressed')
                        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda')
                        break

                    elif b'IN1OFF' in push_button_or_card:
                        logging.info(gate['name'] + ' : Vehicle turn back')
                        reset = True
                        break

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
                    print_ticket(data, gate)

                    # play silakan ambil tiket
                    try:
                        s.sendall(b'\xa6MT00002\xa9')
                        s.recv(1024)
                    except Exception as e:
                        logging.error(gate['name'] + ' : Failed to play silakan ambil tiket' + str(e))
                        break

                # play terimakasih
                try:
                    s.sendall(b'\xa6MT00006\xa9')
                    s.recv(1024)
                except Exception:
                    logging.error(gate['name'] + ' : Failed to play terimakasih' + str(e))
                    break

                # open gate
                try:
                    s.sendall(b'\xa6OPEN1\xa9')
                    s.recv(1024)
                except Exception as e:
                    logging.error(gate['name'] + ' : Failed to open gate ' + str(e))
                    break

                logging.info(gate['name'] + ' : Gate Opened')

                # wait until vehicle in
                while True:
                    try:
                        s.sendall(b'\xa6STAT\xa9')
                        vehicle_in = s.recv(1024)
                    except Exception as e:
                        logging.error(gate['name'] + ' : Failed to sense loop 2 ' + str(e))
                        error = True
                        # break sensing loop 2
                        break

                    if b'IN3OFF' in vehicle_in:
                        logging.info(gate['name'] + ' : Vehicle in')
                        break

                    time.sleep(.5)

                if error:
                    # break loop cek kendaraan, sambung ulang controller
                    break

def start_app():
    DISCONNECT_GATE = False
    LOCATION = get_location()

    if LOCATION == False:
        logging.info('Location not set. Exit application.')
        sys.exit()

    logging.info('Location set: ' + LOCATION['name'])

    GATES = get_gates()

    if GATES == False:
        logging.info('Gate not set. Exit application.')
        sys.exit()

    logging.info('Gate set : ' + ', '.join(map(lambda x: x['name'], GATES)))
    logging.info('Starting application...')

    for g in GATES:
        threading.Thread(target=gate_in_thread, args=(g,)).start()

def stop_app():
    DISCONNECT_GATE = True

    if len(GATE_SOCKET) == 0:
        logging.info('No gate connected')
        return

    for i in GATE_SOCKET:
        try:
            GATE_SOCKET[i].shutdown(socket.SHUT_WR)
        except Exception as e:
            logging.info('Socket already closed ' + str(e))

def restart_app():
    stop_app()
    time.sleep(3)
    start_app()

if __name__ == "__main__":
    logging.basicConfig(filename='parking.log', filemode='a', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    start_app()
