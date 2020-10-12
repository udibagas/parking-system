#!/usr/bin/env python3

import sys
import time
import socket
import datetime
import requests
import threading
import os
import logging

API_URL = 'http://localhost/api'

def get_gates():
    try:
        r = requests.get(API_URL + '/gateIn', params={'status': 1}, timeout=3)
    except Exception as e:
        logging.error('Failed to get gates ' + str(e))
        return False

    if r.status_code == 200:
        return r.json()

    return False

def send_notification(gate, message):
    notification = { 'message': message }

    try:
        requests.post(API_URL + '/gateIn/notification/' + str(gate['id']), data=notification, timeout=3)
    except Exception as e:
        logging.info(gate['nama'] + ' : Failed to send notification ' + str(e))
        return False

    return True

def check_card(gate, nomor_kartu):
    payload = { 'nomor_kartu': nomor_kartu, 'status': 1 }
    try:
        r = requests.get(API_URL + '/member/search', params=payload, timeout=3)
    except Exception as e:
        logging.info(gate['nama'] + ' : Failed to check card ' + str(e))
        return False

    if r.status_code == 200:
        return r.json()

    return False

def save_data(gate, data):
    try:
        r = requests.post(API_URL + '/parkingTransaction', data=data, timeout=3)
    except Exception as e:
        logging.info(gate['nama'] + ' : Failed to save data ' + str(e))
        send_notification(gate, 'Pengunjung di ' + gate['nama'] + ' membutuhkan bantuan Anda')
        return False

    return r.json()

def gate_in_thread(gate):
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(3)

            logging.info(gate['nama'] + ' : Connecting to ' + gate['controller_ip_address'] + ':' + str(gate['controller_port']))

            try:
                s.connect((gate['controller_ip_address'], gate['controller_port']))
            except Exception:
                time.sleep(3)
                continue

            logging.info(gate['nama'] + ' : CONNECTED')
            send_notification(gate, gate['nama'] + ' Terhubung')

            while True:
                try:
                    s.sendall(b'\xa6STAT\xa9')
                    vehicle_detection = s.recv(1024)
                except Exception as e:
                    logging.error(gate['nama'] + ' : Failed to detect vehicle ' + str(e))
                    send_notification(gate, gate['nama'] + ' : Gagal deteksi kendaraan')
                    # keluar dari loop cek kendaraan untuk sambung ulang controller
                    break

                logging.debug(gate['nama'] + ' : Detecting vehicle ' + str(vehicle_detection))

                if b'IN1ON' in vehicle_detection or b'STAT1' in vehicle_detection:
                    logging.info(gate['nama'] + ' : Vehicle detected')
                    try:
                        logging.debug(gate['nama'] + ' : Playing welcome')
                        time.sleep(.1)
                        s.sendall(b'\xa6MT00007\xa9')
                        # logging.debug(gate['nama'] + ' : ' + str(s.recv(1024)))
                    except Exception as e:
                        logging.error(gate['nama'] + ' : Failed to play Selamat Datang ' + str(e))
                        send_notification(gate, gate['nama'] + ' : Gagal play Selamat Datang ')
                        # keluar dari loop cek kendaraan untuk sambung ulang controller
                        break
                else:
                    time.sleep(2)
                    continue

                reset = False
                error = False

                # detect push button or card
                while True:
                    try:
                        time.sleep(.1)
                        s.sendall(b'\xa6STAT\xa9')
                        push_button_or_card = s.recv(1024)
                    except Exception:
                        logging.error(gate['nama'] + ' : Failed to sense button and card')
                        send_notification(gate, gate['nama'] + ' : Gagal mendeteksi tombol tiket')
                        error = True
                        break

                    logging.debug(gate['nama'] + ' : Detecting button or card ' + str(push_button_or_card))

                    if b'W' in push_button_or_card:
                        nomor_kartu = str(push_button_or_card).split('W')[1].split('\\xa9')[0]
                        member = check_card(gate, str(int(nomor_kartu, 16)))
                        time.sleep(.1) # kasih jeda biar audio bisa play

                        if not member:
                            try:
                                s.sendall(b'\xa6MT00003\xa9')
                            except Exception as e:
                                logging.error(gate['nama'] + ' : Failed to respon invalid card ' + str(e))
                                send_notification(gate, gate['nama'] + ' : Gagal merespon kartu invalid')
                                error = True
                                break

                            continue

                        if member['expired']:
                            try:
                                s.sendall(b'\xa6MT00013\xa9')
                            except Exception as e:
                                logging.error(gate['nama'] + ' : Failed to respon card expired ' + str(e))
                                send_notification(gate, gate['nama'] + ' : Gagal merespon kartu expired')
                                error = True
                                break

                            continue

                        if member['unclosed']:
                            try:
                                s.sendall(b'\xa6MT00014\xa9')
                            except Exception as e:
                                logging.error(gate['nama'] + ' : Failed to respon card unclosed ' + str(e))
                                send_notification(gate, gate['nama'] + ' : Gagal merespon kartu belum selesai transaksi')
                                error = True
                                break

                            continue

                        if not member['expired'] and member['expired_in'] == 5:
                            try:
                                s.sendall(b'\xa6MT00011\xa9')
                                time.sleep(6)
                            except Exception as e:
                                logging.error(gate['nama'] + ' : Failed to respon card expired in 5 days ' + str(e))
                                send_notification(gate, gate['nama'] + ' : Gagal merespon kartu expired dalam 5 hari')

                        if not member['expired'] and member['expired_in'] == 1:
                            try:
                                s.sendall(b'\xa6MT00012\xa9')
                                time.sleep(6)
                            except Exception as e:
                                logging.error(gate['nama'] + ' : Failed to respon card expired in 1 day ' + str(e))
                                send_notification(gate, gate['nama'] + ' : Gagal merespon kartu expired dalam 1 hari')

                        data = {'is_member': 1, 'nomor_kartu': member['nomor_kartu'], 'member_id': member['id']}
                        logging.info(gate['nama'] + ' : Kartu terdeteksi :' + member['nomor_kartu'])
                        break

                    elif b'IN2ON' in push_button_or_card or b'STAT11' in push_button_or_card:
                        logging.info(gate['nama'] + ' : Tombol tiket ditekan')
                        data = {'is_member': 0}
                        break

                    elif b'IN3' in push_button_or_card:
                        logging.info(gate['nama'] + ' : Reset')
                        reset = True
                        break

                    elif b'IN4ON' in push_button_or_card:
                        reset = True
                        try:
                            time.sleep(.1)
                            s.sendall(b'\xa6MT00005\xa9')
                            time.sleep(10)
                        except Exception as e:
                            logging.error(gate['nama'] + ' : Gagal merespon tombol bantuan ' + str(e))
                            send_notification(gate, gate['nama'] + ' : Gagal merespon tombol bantuan')
                            error = True
                            break

                        logging.info(gate['nama'] + ' : Tombol bantuan ditekan')
                        send_notification(gate, 'Pengunjung di ' + gate['nama'] + ' membutuhkan bantuan Anda')
                        break

                    elif b'IN1OFF' in push_button_or_card:
                        logging.info(gate['nama'] + ' : Vehicle turn back')
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
                data['jenis_kendaraan'] = gate['jenis_kendaraan']
                save_data(gate, data)

                # kalau bukan member cetak struk
                if data['is_member'] == 0:
                    try:
                        s.sendall(b'\xa6MT00002\xa9')
                        logging.debug(gate['nama'] + ' : ' + str(s.recv(1024)))
                    except Exception as e:
                        logging.error(gate['nama'] + ' : Gagal play silakan ambil tiket' + str(e))
                        send_notification(gate, gate['nama'] + ' : Gagal play silakan ambil tiket')
                        break

                # play terimakasih
                try:
                    s.sendall(b'\xa6MT00006\xa9')
                    logging.debug(gate['nama'] + ' : ' + str(s.recv(1024)))
                except Exception:
                    logging.error(gate['nama'] + ' : Gagal play terimakasih' + str(e))
                    send_notification(gate, gate['nama'] + ' : Gagal play terimakasih')
                    break

                time.sleep(1)

                # open gate
                try:
                    s.sendall(b'\xa6TRIG1\xa9')
                    logging.debug(gate['nama'] + ' : ' + str(s.recv(1024)))
                except Exception as e:
                    logging.error(gate['nama'] + ' : Gagal membuka gate ' + str(e))
                    send_notification(gate, gate['nama'] + ' : Gagal membuka gate')
                    break

                logging.info(gate['nama'] + ' : Gate terbuka')

                # wait until vehicle in
                counter = 0

                while True:
                    # 5x cek aja biar ga kelamaan
                    if counter > 5:
                        logging.info(gate['nama'] + ' : Terlalu lama menunggu')
                        break

                    counter += 1

                    try:
                        s.sendall(b'\xa6STAT\xa9')
                        vehicle_in = s.recv(1024)
                        logging.debug(gate['nama'] + ' : ' + str(vehicle_in))
                    except Exception as e:
                        logging.error(gate['nama'] + ' : Gagal deteksi kendaraan sudah masuk ' + str(e))
                        send_notification(gate, gate['nama'] + ' : Gagal deteksi kendaraan sudah masuk')
                        error = True
                        # break sensing loop 2
                        break

                    if b'IN3OFF' in vehicle_in:
                        logging.info(gate['nama'] + ' : Kendaraan masuk')
                        break

                    time.sleep(1)

                if error:
                    # break loop cek kendaraan, sambung ulang controller
                    break

def start_app():
    gates = get_gates()

    if gates == False:
        logging.info('Tidak ada gate. Keluar dari aplikasi')
        sys.exit()

    logging.info('Gate : ' + ', '.join(map(lambda x: x['nama'], gates)))
    logging.info('Memulai aplikasi...')

    for g in gates:
        threading.Thread(target=gate_in_thread, args=(g,)).start()

if __name__ == "__main__":
    # log_file = os.path.join(os.path.dirname(__file__), "parking.log")
    log_file = '/var/log/parking.log'
    logging.basicConfig(filename=log_file, filemode='a', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    start_app()
