import socket
import time
import sys
import requests
from requests.auth import HTTPDigestAuth
import time
from escpos.printer import Network
import random
import string
import _thread

API_URL = 'http://localhost/api'
LOCATION = ''

def take_snapshot(output_file_name, gate):
    try:
        r = requests.get(gate['camera_image_snapshot_url'], auth=HTTPDigestAuth(gate['camera_username'], gate['camera_password']), timeout=3)
    except Exception as e:
        print("Failed to connect to ip camera")
        return False

    if r.status_code == 200 and r.headers['content-type'] =='image/jpeg':
        with open(output_file_name + '.jpg', 'wb') as f:
            for chunk in r:
                f.write(chunk)
        print('Saved picture: ' + output_file_name)
        return True
    else:
        print(str(r.status_code) + ' ' + r.headers['content-type'])
        return False

def generate_barcode_number():
    return ''.join([random.choice(string.ascii_uppercase + string.digits) for n in range(10)])

def print_ticket(trx_data, gate):
    try:
        p = Network(gate['printer_ip_address'])
    except Exception as e:
        print('failed to connect to printer')
        return False

    print('Printer detected')

    try:
        p.set(align='center')
        p.text("PARKING TICKET\n")
        p.set(height=2, align='center')
        p.text(LOCATION + "\n\n")
        p.set(align='left')
        p.text('Gate'.ljust(10) + ' : ' + gate['name'] + "/" + gate['vehicle_type'] + "\n")
        p.text('Date'.ljust(10) + ' : ' + trx_data['time_in'][:10] + "\n")
        p.text('Time'.ljust(10) + ' : ' + trx_data['time_in'][10:] + "\n\n")
        p.set(align='center')
        p.barcode('*' + trx_data['barcode_number'] + '*', 'CODE39', function_type='A', height=100, width=4, pos='BELOW', align_ct=True)
        p.text("\n")
        p.text("JANGAN MENINGGALKAN TICKET INI &\n")
        p.text("BARANG BERHARGA\n")
        p.text("DI DALAM KENDARAAN ANDA")
        p.cut()
    except Exception as e:
        print("Failed to print ticket " + trx_data['barcode_number'] + " " + str(e))
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

def save_data(data):
    try:
        r = r.requests.post(API_URL + '/parkingTransaction', data=data, timeout=3)
    except Exception as e:
        print("Failed save data", str(e))
        return False

    print(r.json())
    return r.json()

def gate_in_thread(gate):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        print('connecting to ', gate['controller_ip_address'])
        try:
            s.connect((gate['controller_ip_address'], gate['controller_port']))
        except Exception as e:
            print("failed to connect to controller " + str(e))

        print("Controller detected")
        while True:
            try:
                # motor lewat loop detector 1
                print("Detecting vehicle...")
                if 'IN1ON' in s.recv(32):
                    # Play "Selamat datang silahkan tekan tombol hijau" then clear buffer
                    print("ada motor. play selamat datang")
                    s.sendall(b'\xa6MT00001\xa9')
                    s.recv(32)

                # detect push button or card
                reset = False

                while True:
                    push_button_or_card = s.recv(32)
                    if 'W' in push_button_or_card:
                        print('card detected ' + push_button_or_card)
                        card_number = push_button_or_card[3:-1]
                        print("Checking card...")
                        valid_card = check_card(card_number)

                        if not valid_card:
                            continue

                        data = {'is_member': True, 'card_number': card_number}
                        break

                    elif 'IN2ON' in push_button_or_card:
                        print('push button detected')
                        data = {'is_member': False}
                        break

                    elif 'IN3' in push_button_or_card:
                        print('Reset proses')
                        reset = True
                        break

                    elif 'IN4' in push_button_or_card:
                        print('tombol bantuan')
                        reset = True
                        notification = { 'message' : 'Pengunjung di ' + gate.name + ' membutuhkan bantuan Anda' }

                        try:
                            r = requests.post(API_URL + '/notification', data=notification)
                        except Exception as e:
                            print('Failed to notify operator')

                        break

                    elif 'IN1OFF' in push_button_or_card:
                        print('motor balik lagi')
                        reset = True
                        break

                if reset:
                    continue

                data['barcode_number'] = generate_barcode_number()
                print("Taking picture: " + data['barcode_number'])
                data['snapshot_status'] = take_snapshot(data['barcode_number'], gate)

                trx_data = save_data(data)

                # kalau gagal simpan data ulangi dari awal
                if trx_data == False:
                    notification = { 'message' : 'Pengunjung di ' + gate.name + ' membutuhkan bantuan Anda (gagal menyimpan data)' }
                    try:
                        r = requests.post(API_URL + '/notification', data=notification)
                    except Exception as e:
                        print('Failed to notify operator')

                    continue

                # kalau bukan member cetak struk
                if not data['is_member']:
                    print("Printing ticket: " + data['barcode_number'])
                    data['print_status'] = print_ticket(trx_data, gate)

                    if not data['print_status']:
                        notification = { 'message' : 'Pengunjung di ' + gate.name + ' gagal print tiket. Informasikan nomor barcode kepada pengunjung. ' + data['barcode_number'] }
                        try:
                            r = requests.post(API_URL + '/notification', data=notification)
                        except Exception as e:
                            print('Failed to notify operator')

                        data['note'] = "Failed to print ticket"

                    # play "Silahkam ambil dan simpan struk anda" then clear buffer
                    print("silakan ambil tiket")
                    s.sendall(b'\xa6MT00002\xa9')
                    s.recv(32)
                    time.sleep(3)

                # play "Terimakasih" audio then clean buffer
                print("Terimakasih")
                s.sendall(b'\xa6MT00003\xa9')
                s.recv(32)
                # is it required?
                # time.sleep(1)

                # open gate
                print("Open gate")
                s.sendall(b'\xa6OPEN1\xa9')
                if 'OPEN1OK' in s.recv(32):
                    print('Gate opened')
                # gagal buka gate
                else:
                    # get help
                    print('Failed to open gate')

                # detect loop 2 buat reset
                while 'IN3' not in s.recv(32):
                    time.sleep(.5)

                print('Motor masuk. Selesai')

            except KeyboardInterrupt:
                break

        sys.exit()

if __name__ == "__main__":
    # get location info
    try:
        r = requests.get(API_URL + '/locationIdentity/search', params={'active': 1})
    except Exception as e:
        print('Please set location identity', str(e))
        sys.exit()

    location_identity = r.json()
    LOCATION = location_identity['name']

    # get gate IN info
    try:
        r = requests.get(API_URL + '/parkingGate/search', params={'type': 'IN'})
    except Exception as e:
        print('Please set GATE IN', str(e))
        sys.exit()

    gates = r.json()

    gate_in_thread(gates[0])

    # for g in gates:
    #     _thread.start_new_thread(gate_in_thread, (g,))
