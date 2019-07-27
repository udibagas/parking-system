import socket
import time
import sys
import requests
from requests.auth import HTTPDigestAuth
import time
from escpos.printer import Network
import random
import string

GATE_IN_HOST = '192.168.1.201'
GATE_IN_PORT = 4000

LOCATION = "PLAZA SEMARANG"

GATE_OUT_HOST = '127.0.0.1'
GATE_OUT_PORT = 4000

def take_picture(output_file_name):
    try:
        r = requests.get('http://192.168.1.213/cgi-bin/snapshot.cgi', auth=HTTPDigestAuth('admin', 'admin123'), timeout=3)
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
    return ''.join([random.choice(string.ascii_uppercase + string.digits) for n in range(5)])

def print_ticket(ticket_number, barcode_number):
    try:
        p = Network('192.168.1.20')
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
        p.text('Ticket No.'.ljust(10) + ' : ' + ticket_number + "\n")
        p.text('Type'.ljust(10) + " : MOTOR\n")
        p.text('Date'.ljust(10) + ' : ' + time.strftime('%d %b %Y') + "\n")
        p.text('Time'.ljust(10) + ' : ' + time.strftime('%H:%M:%S') + "\n\n")
        p.set(align='center')
        p.barcode('*' + barcode_number + '*', 'CODE39', function_type='A', height=100, width=4, pos='BELOW', align_ct=True)
        p.text("\n")
        p.text("JANGAN MENINGGALKAN TICKET INI &\n")
        p.text("BARANG BERHARGA\n")
        p.text("DI DALAM KENDARAAN ANDA")
        p.cut()
    except Exception as e:
        print("Failed to print ticket " + ticket_number + " " + str(e))
        return False

    return True

def gate_in_thread():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.connect((GATE_IN_HOST, GATE_IN_PORT))
        except Exception as e:
            print("failed to connect to controller " + str(e))

        print("Controller detected")
        while True:
            try:
                # motor lewat loop detector 1
                print("Detecting vehicle...")
                if 'INP11' in s.recv(1024).decode("utf-8").rstrip():
                    # Play "Selamat datang silahkan tekan tombol hijau" then clear buffer
                    print("ada motor. play selamat datang")
                    s.sendall(b':PLAYTRACK1;')
                    s.recv(1024).decode("utf-8").rstrip()

                # detect push button or card
                reset = False
                while True:
                    push_button_or_card = s.recv(1024).decode("utf-8").rstrip()
                    if 'W2' in push_button_or_card or 'W1' in push_button_or_card:
                        print('card detected ' + push_button_or_card)
                        data = {'is_member': True, 'card_number': push_button_or_card[3:-1]}
                        break
                    elif 'INP21' in push_button_or_card:
                        print('push button detected')
                        data = {'is_member': False}
                        break
                    elif 'INP31' in push_button_or_card:
                        print('Reset proses')
                        reset = True
                        break
                    elif 'INP41' in push_button_or_card:
                        print('tombol bantuan')
                        reset = True
                        # TODO: notify to operator (detect OUT2 di controller gate out)
                        break
                    elif 'INP10' in push_button_or_card:
                        print('motor balik lagi')
                        reset = True
                        break
                    else:
                        print("No valid input detected")
                        time.sleep(0.5)

                if reset:
                    continue

                # kalau bukan member cetak struk
                if not data['is_member']:
                    try:
                        r = requests.get(API_URL + '/getLastTicketNumber', timeout=3)
                    except Exception as e:
                        print("Failed to get last ticket number from server " + str(e))
                        # reset lagi ke awal
                        continue

                    response = r.json()
                    data['ticket_number'] = str(response['ticket_number'])
                    data['barcode_number'] = generate_barcode_number()
                    print("Printing ticket: " + data['barcode_number'])
                    print_status = print_ticket(data['ticket_number'], data['barcode_number'])

                    if not print_status:
                        # TODO: notify to operator
                        pass

                    print("Taking picture: " + data['barcode_number'])
                    take_picture(data['barcode_number'])

                    # play "Silahkam ambil dan simpan struk anda" then clear buffer
                    print("silakan ambil tiket")
                    s.sendall(b':PLAYTRACK2;')
                    s.recv(1024).decode("utf-8").rstrip()
                    time.sleep(3)

                # play "Terimakasih" audio then clean buffer
                print("Terimakasih")
                s.sendall(b':PLAYTRACK3;')
                s.recv(1024).decode("utf-8").rstrip()
                # is it required?
                # time.sleep(1)

                # open gate
                print("Open gate")
                s.sendall(b':OPEN1;')
                if 'OUT11' in s.recv(1024).decode("utf-8").rstrip():
                    print('Gate opened')
                # gagal buka gate
                else:
                    # get help
                    print('Failed to open gate')

                # detect loop 2 buat reset
                while 'INP31' not in s.recv(1024).decode("utf-8").rstrip():
                    time.sleep(.5)

                print('Motor masuk')

            except KeyboardInterrupt:
                break

        sys.exit()

gate_in_thread()
# take_picture('aaa')
# print_ticket('12345', 'ABC1234567890DEFG')
