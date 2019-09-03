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
        return False

    try:
        p.set(align='center')
        p.text("TIKET PARKIR\n")
        p.set(height=2, align='center')
        p.text(app.location['name'] + "\n\n")
        p.set(align='left')
        p.text('GATE'.ljust(10) + ' : ' + gate['name'] + "/" + gate['vehicle_type'] + "\n")
        p.text('TANGGAL'.ljust(10) + ' : ' + datetime.datetime.strptime(trx_data['time_in'][:10], '%Y-%m-%d').strftime('%d %b %Y') + "\n")
        p.text('JAM'.ljust(10) + ' : ' + trx_data['time_in'][11:] + "\n\n")
        p.set(align='center')
        p.barcode(trx_data['barcode_number'], 'CODE39', function_type='A', height=100, width=4, pos='BELOW', align_ct=True)
        p.text("\n")
        p.text(app.location['additional_info_ticket'])
        p.cut()
    except Exception as e:
        logging.error(gate['name'] + ' : Failed to print ticket ' + trx_data['barcode_number'] + ' ' + str(e))
        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' gagal print tiket. Informasikan nomor barcode kepada pengunjung. ' + trx_data['barcode_number'])
        return False

    logging.info(gate['name'] + ' : Ticket printed ' + trx_data['barcode_number'])
    return True

def send_notification(gate, message):
    notification = { 'parking_gate_id': gate['id'], 'message': message }
    try:
        r = requests.post(API_URL + '/notification', data=notification, timeout=3)
    except Exception as e:
        logging.info(gate['name'] + ' : Failed to send notification ' + str(e))
        return False

    return True

def check_card(card_number):
    payload = { 'card_number': card_number, 'active': 1 }
    try:
        r = r.requests.get(API_URL + '/parkingMember/', params=payload, timeout=3)
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
    while True:
        if DISCONNECT_GATE:
            break

        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(3)

            logging.info(gate['name'] + ' : Connecting..')

            try:
                s.connect((gate['controller_ip_address'], gate['controller_port']))
            except Exception as e:
                time.sleep(3)
                continue

            GATE_SOCKET[gate['id']] = s
            logging.info(gate['name'] + ' : CONNECTED')
            send_notification(gate, gate['name'] + ' CONNECTED')

            while True:
                try:
                    # motor lewat loop detector 1
                    s.sendall(b'\xa6STAT\xa9')
                    vehicle_detection = s.recv(1024)

                    if b'IN1ON' in vehicle_detection or b'STAT1' in vehicle_detection:
                        logging.info(gate['name'] + ' : Vehicle detected')
                        s.sendall(b'\xa6MT00007\xa9')
                    else:
                        time.sleep(1)
                        continue

                    # detect push button or card
                    reset = False

                    while True:
                        push_button_or_card = s.recv(1024)
                        if b'W' in push_button_or_card:
                            card_number = push_button_or_card[3:-1]
                            valid_card = self.check_card(card_number)

                            if not valid_card:
                                continue

                            data = {'is_member': 1, 'card_number': card_number}
                            logging.info(gate['name'] + ' : Card detected :' + card_number)
                            break

                        elif b'IN2ON' in push_button_or_card:
                            logging.info(gate['name'] + ' : Ticket button pressed')
                            data = {'is_member': 0}
                            break

                        elif b'IN3' in push_button_or_card:
                            logging.info(gate['name'] + ' : Reset')
                            reset = True
                            break

                        elif b'IN4ON' in push_button_or_card:
                            reset = True
                            s.sendall(b'\xa6MT00005\xa9')
                            logging.info(gate['name'] + ' : Help button pressed')
                            send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda')
                            break

                        elif b'IN1OFF' in push_button_or_card:
                            logging.info(gate['name'] + ' : Vehicle turn back')
                            reset = True
                            break

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
                        s.sendall(b'\xa6MT00002\xa9')

                        # wait until selesai play silakan ambil tiket
                        while b'PLAYEND' not in s.recv(1024):
                            pass

                    s.sendall(b'\xa6MT00006\xa9')

                    # wait until selesai play terimakasih
                    while b'PLAYEND' not in s.recv(1024):
                        pass

                    # open gate
                    s.sendall(b'\xa6OPEN1\xa9')

                    # wait until gate opened
                    while b'OPEN1OK' not in s.recv(1024):
                        pass

                    # wait until vehicle in
                    while b'IN3OFF' not in s.recv(1024):
                        pass

                except socket.timeout:
                    pass

                except socket.error as e:
                    # exit sensing, reconnecting
                    try:
                        del GATE_SOCKET[gate['id']]
                    except Exception as e:
                        pass

                    logging.error(gate['name'] + ' DISCONNECTED')
                    send_notification(gate, gate['name'] + ' DISCONNECTED')
                    break

                except Exception as e:
                    logging.error('Unhandled error', str(e))
                    send_notification(gate, gate['name'] + ' Unhandled error' + str(e))
                    DISCONNECT_GATE = True
                    break

def start_app():
    DISCONNECT_GATE = False
    LOCATION = get_location()

    if LOCATION == False:
        logging.info('Location not set')
        sys.exit()

    GATES = get_gates()

    if GATES == False:
        logging.info('Gate not set')
        sys.exit()

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
            logging.info('Socket already closed')

def restart_app():
    stop_app()
    time.sleep(3)
    start_app()

if __name__ == "__main__":
    API_URL = 'http://localhost/api'
    LOCATION = False
    GATES = False
    DISCONNECT_GATE = False
    GATE_SOCKET = {}
    logging.basicConfig(filename='parking.log', filemode='a', format='%(asctime)s - %(levelname)s - %(message)s')
    start_app()
