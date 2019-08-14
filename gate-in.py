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
from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.popup import Popup
from kivy.uix.image import Image
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout


API_URL = 'http://localhost/api'
LOG_TEXT = ''
STOP_THREAD = False
LOCATION = None

class ParkingApp(App):

    def build(self):
        self.gates = []
        self.gate_threads = {}

        layout = GridLayout(cols=2)
        sidebar = BoxLayout(orientation='vertical', size_hint=(.4, 1))
        btn_start = Button(text="START", size_hint=(1, .1))
        btn_stop = Button(text="STOP", size_hint=(1, .1))
        btn_restart = Button(text="RESTART", size_hint=(1, .1))
        btn_clear = Button(text="CLEAR LOG", size_hint=(1, .1))
        btn_exit = Button(text="EXIT", size_hint=(1, .1))
        logo_image = Image(source='./public/images/logo.jpeg', size_hint=(1, .2))
        logo_text = Label(text="MITRATEKNIK\nPARKING SYSTEM\nv1.0\n\n\nwww.mitrateknik.com", size_hint=(1, .3), halign='center')

        btn_start.bind(on_press=self.start_app)
        btn_stop.bind(on_press=self.stop_app)
        btn_restart.bind(on_press=self.restart_app)
        btn_clear.bind(on_press=self.clear_log)
        btn_exit.bind(on_press=self.exit_app)

        sidebar.add_widget(btn_start)
        sidebar.add_widget(btn_stop)
        sidebar.add_widget(btn_restart)
        sidebar.add_widget(btn_clear)
        sidebar.add_widget(btn_exit)
        sidebar.add_widget(logo_image)
        sidebar.add_widget(logo_text)

        layout.add_widget(sidebar)
        self.log_text = TextInput(hint_text='[Press Start]', readonly=True, text='', font_family='Consolas')
        layout.add_widget(self.log_text)

        return layout

    def start_app(self, instance):
        if self.gates and len(self.gate_threads) > 0:
            self.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Application already started\n')
            return

        self.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Starting application...\n')
        self.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Setting location...\n')
        LOCATION = get_location()

        if not LOCATION:
            return

        self.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Location set : ' + LOCATION['name'] + '\n')
        self.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Fetching gates data...\n')
        self.gates = get_gates()

        if self.gates == False:
            app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] No gate found \n')
            return

        self.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Found ' + str(len(self.gates)) + ' gates : '
        self.log_text.insert_text(', '.join(map(lambda x: x['name'], gates)) + '\n')

        STOP_THREAD = False

        for g in self.gates:
            self.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Starting thread for gate ' + g['name'] + '...\n')
            self.gate_threads[g['name']] = threading.Thread(target=self.gate_in_thread, args=(g,)).start()
            self.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Thread ' + g['name'] + ' STARTED\n')
            time.sleep(3)

    def stop_app(self, instance):
        if len(self.gate_threads) == 0:
            return

        self.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Stopping application...\n')
        STOP_THREAD = True

    def restart_app(self, instance):
        self.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Restarting application...\n')
        self.stop_app(instance)
        self.start_app(instance)

    def clear_log(self, instance):
        self.log_text.text = ''

    def exit_app(self, instance):
        popup = Popup(title='CONFIRM', title_align='center', auto_dismiss=False, size_hint=(.5, .5))
        popup_content = BoxLayout(orientation='vertical')
        popup_content.add_widget(Label(text='Anda yakin akan keluar dari aplikasi?'))
        btn_area = BoxLayout(orientation='horizontal', size_hint=(1, .3), padding=10, spacing=10)
        close_btn = Button(text="YA", on_press=lambda instance: sys.exit())
        cancel_btn = Button(text="TIDAK", on_press=lambda instance: popup.dismiss())
        btn_area.add_widget(close_btn)
        btn_area.add_widget(cancel_btn)
        popup_content.add_widget(btn_area)
        popup.add_widget(popup_content)
        popup.open()

def get_location():
    try:
        r = requests.get(API_URL + '/locationIdentity/search', params={'active': 1}, timeout=3)
        return r.json()
    except Exception as e:
        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Please set location identity. ' + str(e) + '\n')
        return False

def get_gates():
    try:
        r = requests.get(API_URL + '/parkingGate/search', params={'type': 'IN'}, timeout=3)
        return r.json()
    except Exception as e:
        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] Please set gate in.' + str(e) + '\n')
        return False

def take_snapshot(gate):
    if gate['camera_status'] == 0:
        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Camera not active\n')
        return ''

    app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Taking snapshot...\n')

    try:
        output_file_name = 'snapshot/' + time.strftime('%Y%m%d%H%M%S') + '.jpg'
        r = requests.get(gate['camera_image_snapshot_url'], auth=HTTPDigestAuth(gate['camera_username'], gate['camera_password']), timeout=3)
    except Exception as e:
        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal mengambil snapshot' + str(e) + '\n')
        self.send_notification(gate, "Gagal mengambil snapshot di gate " + gate['name'] + " (" + str(e) + ")")
        return ''

    if r.status_code == 200 and r.headers['content-type'] =='image/jpeg':
        with open('./public/' + output_file_name, 'wb') as f:
            for chunk in r:
                f.write(chunk)

        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Snapshot berhasil disimpan\n')
        return output_file_name
    else:
        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal mengambil snapshot ' + str(e) + '\n')
        self.send_notification(gate, "Gagal mengambil snapshot di gate " + gate['name'] + " (error " + str(r.status_code) + ")")
        return ''

def generate_barcode_number():
    return ''.join([random.choice(string.ascii_uppercase + string.digits) for n in range(5)])

def print_ticket(trx_data, gate):
    try:
        p = Network(gate['printer_ip_address'])
    except Exception as e:
        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Failed to connect to printer\n')
        return False

    app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Mencetak tiket ' + trx_data['barcode_number'] + '...\n')

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
        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Tiket berhasil di cetak ' + trx_data['barcode_number'] + '\n')
    except Exception as e:
        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal mencetak tiket ' + trx_data['barcode_number'] + '\n')
        self.send_notification(gate, 'Pengunjung di ' + gate['name'] + ' gagal print tiket. Informasikan nomor barcode kepada pengunjung. ' + trx_data['barcode_number'])
        return False

    app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Tiket ' + trx_data['barcode_number'] + ' printed\n')
    return True

def send_notification(gate, message):
    app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Mengirim notifikasi - ' + message + '\n')
    notification = { 'parking_gate_id': gate['id'], 'message': message }
    try:
        r = requests.post(API_URL + '/notification', data=notification, timeout=3)
    except Exception as e:
        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal mengirim notifikasi  \n')
        return False

    return True

def check_card(card_number):
    payload = { 'card_number': card_number, 'active': 1 }
    try:
        r = r.requests.get(API_URL + '/parkingMember/', params=payload, timeout=3)
    except Exception as e:
        return False

    return r.json()

def save_data(gate, data):
    try:
        r = requests.post(API_URL + '/parkingTransaction', data=data, timeout=3)
    except Exception as e:
        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal menyimpan data  \n')
        self.send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda (gagal menyimpan data)')
        return False

    app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Data berhasil disimpan  \n')
    return r.json()

def gate_in_thread(gate):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Connecting to controller ' + gate['controller_ip_address'] + ' \n')
        try:
            s.connect((gate['controller_ip_address'], gate['controller_port']))
        except Exception as e:
            app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Connection to controller failed... \n')
            self.send_notification(gate, 'Controller gate ' + gate['name'] + ' tidak terdeteksi oleh sistem')
            return

        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Controller connected \n')

        while True:
            if STOP_THREAD:
                app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Thread stop \n')
                break

            try:
                # motor lewat loop detector 1
                app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Waiting for vehicle...\n')
                if b'IN1ON' in s.recv(32):
                    app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Vehicle detected \n')
                    s.sendall(b'\xa6MT00007\xa9')
                    s.recv(32)
                else:
                    time.sleep(.2)
                    continue

                # detect push button or card
                reset = False

                while True:
                    if STOP_THREAD:
                        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Thread stop \n')
                        break

                    push_button_or_card = s.recv(32)
                    if b'W' in push_button_or_card:
                        card_number = push_button_or_card[3:-1]
                        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Card detected - ' + card_number + '\n')
                        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Checking card validity... \n')
                        valid_card = self.check_card(card_number)

                        if not valid_card:
                            app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Card not valid \n')
                            continue

                        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Card valid \n')
                        data = {'is_member': 1, 'card_number': card_number}
                        break

                    elif b'IN2ON' in push_button_or_card:
                        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Green button pressed \n')
                        data = {'is_member': 0}
                        break

                    elif b'IN3' in push_button_or_card:
                        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Reset \n')
                        reset = True
                        break

                    elif b'IN4ON' in push_button_or_card:
                        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Red button pressed \n')
                        reset = True
                        s.sendall(b'\xa6MT00005\xa9')
                        s.recv(32)
                        self.send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda')
                        break

                    elif b'IN1OFF' in push_button_or_card:
                        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Vehicle turn back \n')
                        reset = True
                        break

                    else:
                        time.sleep(.2)
                        continue

                if reset:
                    continue

                # lengkapi data kemudian simpan
                data['gate_in_id'] = gate['id']
                data['time_in'] = time.strftime('%Y-%m-%d %T')
                data['vehicle_type'] = gate['vehicle_type']
                data['barcode_number'] = self.generate_barcode_number()
                data['snapshot_in'] = self.take_snapshot(gate)
                self.save_data(gate, data)

                # kalau bukan member cetak struk
                if data['is_member'] == 0:
                    self.print_ticket(data, gate)
                    s.sendall(b'\xa6MT00002\xa9')
                    s.recv(32)
                    time.sleep(3)

                app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Play "Terimakasih" \n')
                s.sendall(b'\xa6MT00006\xa9')
                s.recv(32)
                time.sleep(1)
                # open gate
                app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Open gate \n')
                s.sendall(b'\xa6OPEN1\xa9')
                gate_status = s.recv(32)
                while b'OPEN1' not in gate_status:
                    if STOP_THREAD:
                        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Thread stop \n')
                        break
                    gate_status = s.recv(32)
                    time.sleep(.2)

                if b'OPEN1OK' in gate_status:
                    app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gate opened \n')
                else:
                    app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Failed to open date \n')
                    self.send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda. Gate gagal dibuka.')

                # detect loop 2 buat reset
                while b'IN3OFF' not in s.recv(32):
                    if STOP_THREAD:
                        app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Thread stop \n')
                        break
                    time.sleep(.2)

                app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Thread finished\n')

            except Exception as e:
                app.log_text.insert_text('[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Thread finished' + str(e) + '\n')
                break

if __name__ == "__main__":
    app = ParkingApp()
    app.run()
