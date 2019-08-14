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
from kivy.uix.widget import Widget
from kivy.uix.label import Label
from kivy.uix.popup import Popup
from kivy.uix.image import Image
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.lang import Builder


API_URL = 'http://localhost/api'

Builder.load_string("""
<GateOutScreen>:
    BoxLayout:
        orientation: 'horizontal'

        GridLayout
            cols: 2
            size_hint: (.7, 1)

            Label:
                halign: 'right'
                text: 'NO. PLAT'

            TextInput:
                multiline: False,
                hint_text: 'NO. PLAT'

            Label:
                halign: 'right'
                text: 'NO. TIKET'

            TextInput:
                multiline: False
                hint_text: 'NO. TIKET'

            Label:
                halign: 'right'
                text: 'GATE IN'

            TextInput:
                multiline: False
                hint_text: 'GATE IN'

            Label:
                halign: 'right'
                text: 'MASUK'

            TextInput:
                multiline: False
                hint_text: 'MASUK'

            Label:
                halign: 'right'
                text: 'KELUAR'

            TextInput:
                multiline: False
                hint_text: 'KELUAR'

            Label:
                halign: 'right'
                text: 'DURASI'

            TextInput:
                multiline: False
                hint_text: 'DURASI'

            Label:
                halign: 'right'
                text: 'TARIF'

            TextInput:
                multiline: False
                hint_text: 'TARIF'

        BoxLayout:
            orientation: 'vertical'
            size_hint: (.3, 1)

            Label:
                text: 'SNAPSHOT IN'

            Label
                text: 'SNAPSHOT OUT'

<LoginScreen>:
    username: username
    password: password

    BoxLayout:
        orientation: 'vertical'
        padding: 50

        TextInput:
            id: username
            hint_text: 'Username'
            multiline: False
            size_hint: (1, .2)

        TextInput:
            id: password
            hint_text: 'Password'
            password: True
            multiline: False
            size_hint: (1, .2)

        BoxLayout:
            orientation: 'horizontal'
            size_hint: (1, .2)

            Button:
                text: 'CANCEL'
                on_press: root.manager.current = 'gate_in'

            Button:
                text: 'LOGIN'
                on_press: root.login(username, password)

<GateInControllerScreen>:
    gates: []
    gate_threads: []
    location: None
    log_text: log_text

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

            Image:
                source: './public/images/logo.jpeg'
                size_hint: (1, .25)

            Label:
                text: 'MITRATEKNIK\\nPARKING SYSTEM\\nv1.0\\n\\n\\nwww.mitrateknik.com'
                size_hint: (1, .25)
                halign: 'center'

        TextInput:
            id: log_text
            hint_text: '[Press Start]'
            readonly: True
""")

class LoginScreen(Screen):

    def login(self, username, password):
        print(username, password)
        sm.current = 'gate_out'

class GateOutScreen(Screen):
    pass


class GateInControllerScreen(Screen):

    def start_app(self):
        if self.gates and len(self.gate_threads) > 0:
            self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Application already started\n'
            return

        self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Starting application...\n'
        self.location = get_location()

        if not self.location:
            return

        self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Location set : ' + self.location['name'] + '\n'
        self.gates = get_gates()

        if self.gates == False:
            app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] No gate found \n'
            return

        self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Found ' + str(len(self.gates)) + ' gates : '
        self.log_text.text += ', '.join(map(lambda x: x['name'], self.gates)) + '\n'

        for g in self.gates:
            threading.Thread(target=gate_in_thread, args=(g,)).start()

    def stop_app(self):
        if len(self.gate_threads) == 0:
            return

        self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Stopping application...\n'

        for s in self.gate_threads:
            s.shutdown(socket.SHUT_WR)

        self.gate_threads = []
        self.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Application STOPPED\n'

    def restart_app(self):
        self.stop_app()
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

    def exit_app(self):
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
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal mengambil snapshot' + str(e) + '\n'
        send_notification(gate, "Gagal mengambil snapshot di gate " + gate['name'] + " (" + str(e) + ")")
        return ''

    if r.status_code == 200 and r.headers['content-type'] =='image/jpeg':
        with open('./public/' + output_file_name, 'wb') as f:
            for chunk in r:
                f.write(chunk)

        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Snapshot berhasil disimpan' + output_file_name + ' \n'
        return output_file_name
    else:
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gagal mengambil snapshot ' + str(r.status_code) + '\n'
        send_notification(gate, "Gagal mengambil snapshot di gate " + gate['name'] + " (error " + str(r.status_code) + ")")
        return ''

def generate_barcode_number():
    return ''.join([random.choice(string.ascii_uppercase + string.digits) for n in range(5)])

def print_ticket(trx_data, gate):
    try:
        p = Network(gate['printer_ip_address'])
    except Exception as e:
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Failed to connect to printer\n'
        return False

    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Mencetak tiket ' + trx_data['barcode_number'] + '...\n'

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
    time.sleep(1)
    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Connecting to controller ' + gate['controller_ip_address'] + ' \n'
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.connect((gate['controller_ip_address'], gate['controller_port']))
        except Exception as e:
            app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Connection to controller failed... \n'
            send_notification(gate, 'Controller gate ' + gate['name'] + ' tidak terdeteksi oleh sistem')
            return

        app.gate_threads.append(s)
        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Controller connected \n'

        while True:
            try:
                # motor lewat loop detector 1
                app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Waiting for vehicle...\n'
                vehicle_detection = s.recv(32)

                if b'IN1ON' in vehicle_detection:
                    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Vehicle detected \n'
                    s.sendall(b'\xa6MT00007\xa9')
                    s.recv(32)
                # connection lost
                elif vehicle_detection == b'':
                    break
                else:
                    continue

                # detect push button or card
                reset = False

                while True:
                    push_button_or_card = s.recv(32)
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
                        s.recv(32)
                        send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda')
                        break

                    elif b'IN1OFF' in push_button_or_card:
                        app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Vehicle turn back \n'
                        reset = True
                        break

                    # connection lost
                    elif b'' == push_button_or_card:
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
                    # connection lost
                    if b'' == s.recv(32):
                        break
                    time.sleep(3)

                app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Play "Terimakasih" \n'
                s.sendall(b'\xa6MT00006\xa9')
                # connection lost
                if b'' == s.recv(32):
                    break
                time.sleep(1)
                # open gate
                app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Open gate \n'
                s.sendall(b'\xa6OPEN1\xa9')
                gate_status = s.recv(32)
                if gate_status == b'':
                    break
                while b'OPEN1' not in gate_status and gate_status != b'':
                    gate_status = s.recv(32)
                    time.sleep(.2)

                if b'OPEN1OK' in gate_status:
                    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Gate opened \n'
                elif b'' == gate_status:
                    break
                else:
                    app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Failed to open date \n'
                    send_notification(gate, 'Pengunjung di ' + gate['name'] + ' membutuhkan bantuan Anda. Gate gagal dibuka.')

                # detect loop 2 buat reset
                loop_2 = s.recv(32)
                while b'IN3OFF' not in loop_2 and loop_2 != b'':
                    loop_2 = s.recv(32)

                app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : Thread finished\n'

            except Exception as e:
                app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] ' + gate['name'] + ' : stopped. ' + str(e) + '\n'
                break

class ParkingApp(App):

    def build(self):
        return sm

sm  = ScreenManager()
app = GateInControllerScreen(name='gate_in')
sm.add_widget(app)
sm.add_widget(GateOutScreen(name='gate_out'))
sm.add_widget(LoginScreen(name='login'))

if __name__ == "__main__":
    ParkingApp().run()
