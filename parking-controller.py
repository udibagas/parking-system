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
from kivy.lang import Builder
from kivy.uix.label import Label
from kivy.uix.popup import Popup
from kivy.uix.widget import Widget
from kivy.uix.button import Button
from kivy.uix.image import AsyncImage
from kivy.uix.textinput import TextInput
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.screenmanager import ScreenManager, Screen
import os

API_URL = 'http://localhost/api'

Builder.load_string("""
<GateInControllerScreen>:
    gates: []
    location: None
    log_text: log_text
    status_bar: status_bar

    GridLayout:
        cols: 2

        BoxLayout:
            orientation: 'vertical'
            size_hint: (.4, 1)

            Button:
                text: 'START'
                size_hint: (1, .1)
                on_press: root.start_app()

            Button:
                text: 'STOP'
                size_hint: (1, .1)
                on_press: root.stop_app()

            Button:
                text: 'RESTART'
                size_hint: (1, .1)
                on_press: root.restart_app()

            Button:
                text: 'CLEAR LOG'
                size_hint: (1, .1)
                on_press: root.clear_log()

            Button:
                text: 'EXIT'
                size_hint: (1, .1)
                on_press: root.confirm_exit()

            AsyncImage:
                source: 'http://localhost/images/logo.jpeg'
                size_hint: (1, .25)

            Label:
                text: 'MITRATEKNIK\\nPARKING SYSTEM\\nv1.1\\n\\n\\nwww.mitrateknik.co.id'
                size_hint: (1, .25)
                halign: 'center'

        BoxLayout:
            orientation: 'vertical'

            TextInput:
                id: log_text
                hint_text: '[Press Start]'
                readonly: True
                size_hint: (1, .92)

            BoxLayout:
                id: status_bar
                orientation: 'horizontal'
                size_hint: (1, .08)
""")

class GateInControllerScreen(Screen):

    def __init__(self, **kwargs):
        super(GateInControllerScreen, self).__init__(**kwargs)
        self.gate_indicator = {}
        self.gate_threads = {}
        self.gates = {}
        self.disconnect_controller = False

    def init_app(self):
        if len(self.gates) > 0:
            self.status_bar.clear_widgets()

        self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Initializing...\n'
        self.location = get_location()

        if not self.location:
            return

        self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Location set : ' + self.location['name'] + '\n'
        self.gates = get_gates()

        if self.gates == False:
            self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] No gate found \n'
            return

        self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Found ' + str(len(self.gates)) + ' gates : '
        self.log_text.text += ', '.join(map(lambda x: x['name'], self.gates)) + '\n'

        for g in self.gates:
            self.gate_indicator[g['id']] = Button(text=g['name'], background_color=[1,0,0,1], bold=True, font_size='20sp')
            self.status_bar.add_widget(self.gate_indicator[g['id']])

    def start_app(self):
        self.init_app()
        self.disconnect_controller = False

        if self.gates and len(self.gate_threads) > 0:
            self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Application already started\n'

            for g in self.gates:
                self.gate_indicator[g['id']].background_color = [0,1,0,1]

            return

        self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Starting application...\n'

        for g in self.gates:
            threading.Thread(target=gate_in_thread, args=(g,)).start()

    def stop_app(self):
        if len(self.gate_threads) == 0:
            return

        self.disconnect_controller = True
        self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Stopping application...\n'

        for i in self.gate_threads:
            try:
                self.gate_threads[i].shutdown(socket.SHUT_WR)
            except Exception as e:
                self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Socket already closed\n'

            self.gate_indicator[i].background_color = [1,0,0,1]

        self.gate_threads = {}
        self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Application STOPPED\n'

    def restart_app(self):
        self.stop_app()
        time.sleep(3)
        self.start_app()

    def clear_log(self):
        self.log_text.text = ''

    def confirm_exit(self):
        popup = Popup(title='CONFIRM', title_align='center', auto_dismiss=False, size_hint=(.5, .5))
        popup_content = BoxLayout(orientation='vertical')
        popup_content.add_widget(Label(text='Anda yakin akan keluar dari aplikasi?'))
        btn_area = BoxLayout(orientation='horizontal', size_hint=(1, .3), padding=10, spacing=10)
        close_btn = Button(text="YA", on_press=self.exit_app)
        cancel_btn = Button(text="TIDAK", on_press=lambda instance: popup.dismiss())
        btn_area.add_widget(close_btn)
        btn_area.add_widget(cancel_btn)
        popup_content.add_widget(btn_area)
        popup.add_widget(popup_content)
        popup.open()

    def exit_app(self, instance):
        self.stop_app()
        sys.exit()

def get_location():
    try:
        r = requests.get(API_URL + '/locationIdentity/search', params={'active': 1}, timeout=3)
        return r.json()
    except Exception as e:
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Please set location identity. ' + str(e) + '\n'
        return False

def get_gates():
    try:
        r = requests.get(API_URL + '/parkingGate/search', params={'type': 'IN'}, timeout=3)
        return r.json()
    except Exception as e:
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Please set gate in.' + str(e) + '\n'
        return False

def take_snapshot(gate):
    if gate['camera_status'] == 0:
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Camera not active\n'
        return ''

    try:
        output_file_name = 'snapshot/' + time.strftime('%Y%m%d%H%M%S') + '.jpg'
        if gate['camera_auth_type'] == 'digest':
            r = requests.get(gate['camera_image_snapshot_url'], auth=HTTPDigestAuth(gate['camera_username'], gate['camera_password']), timeout=3)
        else:
            r = requests.get(gate['camera_image_snapshot_url'], auth=(gate['camera_username'], gate['camera_password']), timeout=3)
    except Exception as e:
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal mengambil snapshot ' + str(e) + '\n'
        send_notification(gate, "Gagal mengambil snapshot di gate " + gate['name'] + " (" + str(e) + ")")
        return ''

    if r.status_code == 200 and r.headers['content-type'] =='image/jpeg':
        # with open(os.path.join(os.path.dirname(__file__), "public/" + output_file_name), 'wb') as f:
        with open('./public/' + output_file_name, 'wb') as f:
            for chunk in r:
                f.write(chunk)

        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Snapshot berhasil disimpan ' + output_file_name + ' \n'
        return output_file_name
    else:
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal mengambil snapshot ' + str(r.status_code) + '\n'
        send_notification(gate, "Gagal mengambil snapshot di gate " + gate['name'] + " (error " + str(r.status_code) + ")")
        return ''

def generate_barcode_number():
    return ''.join([random.choice(string.ascii_uppercase + string.digits) for n in range(5)])

# assume semua pake printer network
def print_ticket(trx_data, gate):
    try:
        p = Network(gate['printer_ip_address'])
    except Exception as e:
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Failed to connect to printer\n'
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
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal mencetak tiket ' + trx_data['barcode_number'] + '\n'
        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' gagal print tiket. Informasikan nomor barcode kepada pengunjung. ' + trx_data['barcode_number'])
        return False

    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Tiket berhasil di cetak ' + trx_data['barcode_number'] + '\n'
    return True

def send_notification(gate, message):
    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Mengirim notifikasi - ' + message + '\n'
    notification = { 'parking_gate_id': gate['id'], 'message': message }
    try:
        r = requests.post(API_URL + '/notification', data=notification, timeout=3)
    except Exception as e:
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal mengirim notifikasi  \n'
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
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal menyimpan data  \n'
        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda (gagal menyimpan data)')
        return False

    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Data berhasil disimpan  \n'
    return r.json()

def gate_in_thread(gate):
    while True:
        # langsung keluar kalau ada command disconnect controller
        if app.disconnect_controller:
            break

        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Connecting to controller ' + gate['controller_ip_address'] + ' \n'

        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(3)

            try:
                s.connect((gate['controller_ip_address'], gate['controller_port']))
            except Exception as e:
                # tunggu dulu 3 detik baru reconnect
                time.sleep(3)
                continue

            app.gate_threads[gate['id']] = s
            app.gate_indicator[gate['id']].background_color = [0,1,0,1]
            app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : CONNECTED \n'
            send_notification(gate, gate['name'] + ' CONNECTED')

            while True:
                try:
                    # motor lewat loop detector 1
                    s.sendall(b'\xa6STAT\xa9')
                    s.settimeout(0)
                    vehicle_detection = s.recv(1024)

                    if b'IN1ON' in vehicle_detection or b'STAT1' in vehicle_detection:
                        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Vehicle detected \n'
                        s.settimeout(3)
                        s.sendall(b'\xa6MT00007\xa9')
                    else:
                        time.sleep(1)
                        continue

                    # detect push button or card
                    reset = False

                    while True:
                        s.settimeout(0)
                        push_button_or_card = s.recv(1024)
                        if b'W' in push_button_or_card:
                            card_number = push_button_or_card[3:-1]
                            app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Card detected - ' + card_number + '\n'
                            app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Checking card validity... \n'
                            valid_card = self.check_card(card_number)

                            if not valid_card:
                                app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Card not valid \n'
                                continue

                            app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Card valid \n'
                            data = {'is_member': 1, 'card_number': card_number}
                            break

                        elif b'IN2ON' in push_button_or_card:
                            app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Green button pressed \n'
                            data = {'is_member': 0}
                            break

                        elif b'IN3' in push_button_or_card:
                            app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Reset \n'
                            reset = True
                            break

                        elif b'IN4ON' in push_button_or_card:
                            app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Red button pressed \n'
                            reset = True
                            s.sendall(b'\xa6MT00005\xa9')
                            s.recv(1024)
                            send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda')
                            break

                        elif b'IN1OFF' in push_button_or_card:
                            app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Vehicle turn back \n'
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
                        s.settimeout(3)
                        s.sendall(b'\xa6MT00002\xa9')

                        # wait until selesai play silakan ambil tiket
                        s.settimeout(0)
                        while b'PLAYEND' not in s.recv(1024):
                            time.sleep(.3)

                    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Play "Terimakasih" \n'
                    s.settimeout(3)
                    s.sendall(b'\xa6MT00006\xa9')

                    # wait until selesai play terimakasih
                    s.settimeout(0)
                    while b'PLAYEND' not in s.recv(1024):
                        time.sleep(.2)

                    # open gate
                    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Open gate \n'
                    s.settimeout(3)
                    s.sendall(b'\xa6OPEN1\xa9')

                    # wait until gate opened
                    s.settimeout(0)
                    while b'OPEN1OK' not in s.recv(1024):
                        time.sleep(.2)
                    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gate opened \n'

                    # wait until vehicle in
                    while b'IN3OFF' not in s.recv(1024):
                        time.sleep(.2)

                    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Vehicle IN\n'

                except Exception as e:
                    # exit sensing, reconnecting
                    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : DISCONNECTED ' + str(e) + '\n'
                    send_notification(gate, gate['name'] + ' DISCONNECTED')
                    app.gate_indicator[gate['id']].background_color = [1,0,0,1]

                    try:
                        del app.gate_threads[gate['id']]
                    except Exception as e:
                        pass
                    break

class ParkingControllerApp(App):

    def build(self):
        self.title = 'ENTRANCE GATE CONTROLLER - MITRATEKNIK PARKING SYSTEM V1.1'
        return sm

    def on_stop(self):
        app.stop_app()

sm  = ScreenManager()
app = GateInControllerScreen(name='gate_in')
sm.add_widget(app)

if __name__ == "__main__":
    ParkingControllerApp().run()
