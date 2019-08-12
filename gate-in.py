import socket
import time
import sys
import requests
from requests.auth import HTTPDigestAuth
from escpos.printer import Network
import random
import string
import threading
import datetime

API_URL = 'http://localhost/api'
LOCATION = {}

def take_snapshot(gate):
    output_file_name = 'snapshot/' + time.strftime('%Y%m%d%H%m%s') + '.jpg'

    try:
        r = requests.get(gate['camera_image_snapshot_url'], auth=HTTPDigestAuth(gate['camera_username'], gate['camera_password']), timeout=3)
    except Exception as e:
        send_notification(gate['id'], "Gagal mengambil snapshot di gate " + gate['name'] + " (" + str(e) + ")")

    if r.status_code == 200 and r.headers['content-type'] =='image/jpeg':
        with open('./public/' + output_file_name, 'wb') as f:
            for chunk in r:
                f.write(chunk)
    else:
        send_notification(gate['id'], "Gagal mengambil snapshot di gate " + gate['name'] + " (error " + str(r.status_code) + ")")

    return output_file_name

def generate_barcode_number():
    return ''.join([random.choice(string.ascii_uppercase + string.digits) for n in range(5)])

def print_ticket(trx_data, gate):
    try:
        p = Network(gate['printer_ip_address'])
    except Exception as e:
        print('failed to connect to printer')
        return False

    print('Printing ticket', trx_data['barcode_number'])

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
        p.text("JANGAN MENINGGALKAN TIKET INI &\n")
        p.text("BARANG BERHARGA\n")
        p.text("DI DALAM KENDARAAN ANDA")
        p.cut()
    except Exception as e:
        send_notification(gate['id'], 'Pengunjung di ' + gate['name'] + ' gagal print tiket. Informasikan nomor barcode kepada pengunjung. ' + trx_data['barcode_number'])
        return False

    return True

def send_notification(gate_id, message):
    print("Sending notification : ", message)
    notification = { 'parking_gate_id': gate_id, 'message': message }
    try:
        r = requests.post(API_URL + '/notification', data=notification, timeout=3)
    except Exception as e:
        print("Failed to send notification :", str(e))
        return False

    return True

def check_card(card_number):
    payload = { 'card_number': card_number, 'active': 1 }
    try:
        r = r.requests.get(API_URL + '/parkingMember/', params=payload, timeout=3)
    except Exception as e:
        print("Failed to check card", str(e))
        return False

    print(r.json())
    return r.json()

def save_data(gate, data):
    print("Saving data : ", data)
    try:
        r = requests.post(API_URL + '/parkingTransaction', data=data, timeout=3)
    except Exception as e:
        print("Failed save data", str(e))
        send_notification(gate['id'], 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda (gagal menyimpan data)')
        return False

    print(r.status_code)
    return r.json()

def gate_in_thread(gate):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        print('Connecting to ', gate['controller_ip_address'], str(gate['controller_port']))
        try:
            s.connect((gate['controller_ip_address'], gate['controller_port']))
        except Exception as e:
            send_notification(gate['id'], 'Controller gate ' + gate['name'] + ' tidak terdeteksi oleh sistem')
            print("Failed to connect to controller " + str(e))

        print("Controller detected")
        while True:
            try:
                # motor lewat loop detector 1
                print("Detecting vehicle...")
                if b'IN1ON' in s.recv(32):
                    print("Selamat datang")
                    s.sendall(b'\xa6MT00007\xa9')
                    s.recv(32)

                # detect push button or card
                reset = False

                while True:
                    push_button_or_card = s.recv(32)
                    if b'W' in push_button_or_card:
                        print('card detected ' + push_button_or_card)
                        card_number = push_button_or_card[3:-1]
                        print("Checking card...")
                        valid_card = check_card(card_number)

                        if not valid_card:
                            continue

                        data = {'is_member': 1, 'card_number': card_number}
                        break

                    elif b'IN2ON' in push_button_or_card:
                        print('push button detected')
                        data = {'is_member': 0}
                        break

                    elif b'IN3' in push_button_or_card:
                        print('Reset proses')
                        reset = True
                        break

                    elif b'IN4ON' in push_button_or_card:
                        print('tombol bantuan')
                        reset = True
                        s.sendall(b'\xa6MT00005\xa9')
                        s.recv(32)
                        send_notification(gate['id'], 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda')
                        break

                    elif b'IN1OFF' in push_button_or_card:
                        print('motor balik lagi')
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
                    print_ticket(trx_data, gate)
                    print("silakan ambil tiket")
                    s.sendall(b'\xa6MT00002\xa9')
                    s.recv(32)
                    time.sleep(3)

                # play "Terimakasih" audio then clean buffer
                print("Terimakasih")
                s.sendall(b'\xa6MT00006\xa9')
                s.recv(32)
                time.sleep(1)

                # open gate
                print("Open gate")
                s.sendall(b'\xa6OPEN1\xa9')
                if b'OPEN1OK' in s.recv(32):
                    print('Gate opened')
                else:
                    print('Failed to open gate')
                    send_notification(gate['id'], 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda. Gate gagal dibuka.')

                # detect loop 2 buat reset
                while b'IN3' not in s.recv(32):
                    time.sleep(.5)

                print('Motor masuk. Selesai')

            except KeyboardInterrupt:
                break

        sys.exit()

def get_location():
    try:
        r = requests.get(API_URL + '/locationIdentity/search', params={'active': 1}, timeout=3)
    except Exception as e:
        print('Please set location identity', str(e))
        sys.exit()

    return r.json()

def get_gates():
    try:
        r = requests.get(API_URL + '/parkingGate/search', params={'type': 'IN'}, timeout=3)
    except Exception as e:
        print('Please set GATE IN', str(e))
        sys.exit()

    return r.json()

if __name__ == "__main__":
    LOCATION = get_location()
    gates = get_gates()
    # gate_in_thread(gates[0])

    for g in gates:
        x = threading.Thread(target=gate_in_thread, args=(g,))
        x.start()
