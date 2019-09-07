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
        return ''

    try:
        r = requests.get(API_URL + '/parkingGate/takeSnapshot/' + str(gate['id']))
    except Exception as e:
        logging.error(gate['name'] + ' : Failed to take snapshot ' + str(e))
        send_notification(gate, "Gagal mengambil snapshot di gate " + gate['name'] + " (" + str(e) + ")")
        return ''

    respons = r.json()
    return respons['filename']

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

def play_audio(s, gate, audio, wait=False):
    logging.info(gate['name'] + ' : Playing "' + audio + '"')
    cmd_list = {
        'take_ticket' : b'\xa6MT00002\xa9',
        'invalid_card' : b'\xa6MT00003\xa9',
        'help' : b'\xa6MT00005\xa9',
        'thanks' : b'\xa6MT00006\xa9',
        'welcome' : b'\xa6MT00007\xa9'
    }

    s.sendall(cmd_list[audio])
    response = s.recv(1024)
    logging.debug(gate['name'] + ' : ' + str(response))

    if response == b'':
        raise BrokenPipeError('Connection dropped when playing "' + audio + '"')

    if wait:
        while b'PLAYEND' not in response:
            response = s.recv(1024)
            logging.debug(gate['name'] + ' : ' + str(response))

def open_gate(s, gate):
    logging.info(gate['name'] + ' : Open gate')
    s.sendall(b'\xa6OPEN1\xa9')
    response = s.recv(1024)
    logging.debug(gate['name'] + ' : ' + str(response))

    if response == b'':
        raise BrokenPipeError('Connection dropped when open gate')

    logging.info(gate['name'] + ' : Gate opened')

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
            s.settimeout(None)

            while True:
                try:
                    s.sendall(b'\xa6STAT\xa9')
                    vehicle_detection = s.recv(1024)
                    logging.debug(gate['name'] + ' : ' + str(vehicle_detection))

                    if b'IN1ON' in vehicle_detection or b'STAT1' in vehicle_detection:
                        logging.info(gate['name'] + ' : Vehicle detected')
                        play_audio(s, gate, 'welcome')
                    elif vehicle_detection == b'':
                        raise BrokenPipeError('Connection dropped when sensing vehicle.')
                    else:
                        time.sleep(3)
                        continue

                    reset = False

                    # detect push button or card
                    while True:
                        push_button_or_card = s.recv(1024)
                        logging.debug(gate['name'] + ' : ' + str(push_button_or_card))

                        if b'W' in push_button_or_card:
                            card_number = str(push_button_or_card).split('W')[1].split('\\xa9')[0]
                            valid_card = check_card(gate, str(int(card_number, 16)))

                            if not valid_card:
                                play_audio(s, gate, 'invalid_card')
                                continue

                            data = {'is_member': 1, 'card_number': valid_card['card_number']}
                            logging.info(gate['name'] + ' : Card detected :' + valid_card['card_number'])
                            break

                        elif b'IN2ON' in push_button_or_card:
                            logging.info(gate['name'] + ' : Ticket button pressed')
                            data = {'is_member': 0}
                            break

                        elif b'IN4ON' in push_button_or_card:
                            play_audio(s, gate, 'help')
                            logging.info(gate['name'] + ' : Help button pressed')
                            send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda')
                            reset = True
                            break

                        elif b'IN1OFF' in push_button_or_card:
                            logging.info(gate['name'] + ' : Vehicle turn back')
                            reset = True
                            break

                        elif b'IN3' in push_button_or_card:
                            logging.info(gate['name'] + ' : Reset')
                            reset = True
                            break

                        elif push_button_or_card == b'':
                            raise BrokenPipeError('Connection dropped when sensing button and card')

                    # END LOOP SENSING BUTTON OR CARD WHEN VEHICLE DETECTED

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
                        play_audio(s, gate, 'take_ticket')

                    # play terimakasih
                    play_audio(s, gate, 'thanks')
                    time.sleep(1)
                    open_gate(s, gate)

                    # wait until vehicle in
                    while True:
                        vehicle_in = s.recv(1024)
                        logging.debug(gate['name'] + ' : ' + str(vehicle_in))

                        if b'IN3OFF' in vehicle_in:
                            logging.info(gate['name'] + ' : Vehicle in')
                            break

                        elif vehicle_in == b'':
                            raise BrokenPipeError('Connection dropped when sensing loop 2')

                except BrokenPipeError as e:
                    logging.error(gate['name'] + ' : ' + str(e))
                    send_notification(gate, gate['name'] + ' : ' + str(e))
                    logging.info(gate['name'] + ' : Reset process in 3 sec...')
                    time.sleep(3)
                    continue

                except Exception as e:
                    logging.error(gate['name'] + ' : Unhandled exception ' + str(e))
                    send_notification(gate, gate['name'] + ' : Unhandled exception. ' + str(e))
                    logging.info(gate['name'] + ': Reset process in 3 sec...')
                    time.sleep(3)
                    continue

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
    log_file = os.path.join(os.path.dirname(__file__), "parking.log")
    logging.basicConfig(filename=log_file, filemode='a', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    start_app()
