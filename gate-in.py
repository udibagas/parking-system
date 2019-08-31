#!/usr/bin/env python3

import sys
import time
import random
import string
import datetime
import requests
from escpos.printer import Network, File
from kivy.app import App
from kivy.lang import Builder
from kivy.clock import Clock
from kivy.uix.label import Label
from kivy.uix.popup import Popup
from kivy.uix.button import Button
from kivy.uix.image import AsyncImage
from kivy.uix.textinput import TextInput
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.screenmanager import ScreenManager, Screen
from serial import Serial

API_URL = 'http://localhost/api'

Builder.load_file('./gate-in.kv')

class LoginScreen(Screen):

    def login(self):
        data = { 'username' : self.username.text, 'password' : self.password.text }

        try:
            r = requests.post(API_URL + '/login', data=data)
        except Exception as e:
            popup = Popup(title='LOGIN FAILED', title_align='center', auto_dismiss=False, size_hint=(.5, .5))
            popup_content = BoxLayout(orientation='vertical')
            popup_content.add_widget(Label(text='Username atau password salah'))
            popup_content.add_widget(Button(text="TIDAK", size_hint=(1, .2), on_press=lambda instance: popup.dismiss()))
            popup.add_widget(popup_content)
            popup.open()
            print('login failed')

        sm.current = 'gate-in'

class GateInScreen(Screen):

    def __init__(self, **kwargs):
        super(GateInScreen, self).__init__(**kwargs)
        self.location = {}
        self.user = {}
        self.gate = {}
        Clock.schedule_interval(self.update_clock, 1)
        # self.get_location()
        # self.get_gates()

    def update_clock(self, event):
        self.clock.text = time.strftime('%d-%b-%Y %T').upper() + "\n"

    def logout(self):
        self.user = {}
        sm.current = 'login'

    def get_location(self):
        try:
            r = requests.get(API_URL + '/locationIdentity/search', params={'active': 1}, timeout=3)
        except Exception as e:
            # TODO : show failed
            print('failed')
            return False

        self.location = r.json()

    def get_gates(self):
        try:
            r = requests.get(API_URL + '/parkingGate/search', params={'type': 'IN'}, timeout=3)
        except Exception as e:
            app.log_text.text += '[' + time.strftime('%Y-%m-%d %T') + '] Please set gate in.' + str(e) + '\n'
            # TODO: show failed
            return False

        gates = r.json()
        self.gate = gates[0]

    def generate_barcode_number(self):
        return ''.join([random.choice(string.ascii_uppercase + string.digits) for n in range(5)])

    def save_data(self, data):
        try:
            r = requests.post(API_URL + '/parkingTransaction', data=data)
        except Exception as e:
            # TODO: show failed
            return

        self.plate_number = ''

    def print_ticket(self, data):
        try:
            if self.gate['printer_type'] == 'network':
                p = Network(self.gate['printer_ip_address'])
            elif self.gate['printer_type'] == 'local':
                p = File(self.gate['printer_device'])
        except Exception as e:
            return
            print('failed')

        try:
            p.set(align='center')
            p.text("TIKET PARKIR\n")
            p.set(height=2, align='center')
            p.text(self.location['name'] + "\n\n")
            p.set(align='center')
            p.text('Rp. ' + f'{str(data['fare']):,}' + "\n")
            p.text(data['plate_number'] + "/" + data['vehicle_type'] + "\n\n")
            p.set(align='left')
            p.text('GATE'.ljust(10) + ' : ' + self.gate['name'] + "\n")
            p.text('TANGGAL'.ljust(10) + ' : ' + datetime.datetime.strptime(data['time_in'][:10], '%Y-%m-%d').strftime('%d %b %Y') + "\n")
            p.text('JAM'.ljust(10) + ' : ' + data['time_in'][11:] + "\n\n")
            p.text('PETUGAS'.ljust(10) + ' : ' + self.user['name'] + "\n\n")
            p.text(self.location['additional_info_ticket'])
            p.cut()
        except Exception as e:
            print('failed')
            return False

        return True

    def open_gate(self):
        data = {
            'time_in': time.strftime('%Y-%m-%d %T'),
            'plate_number': self.plate_number.text,
            'operator': self.user['name'],
            'gate_in_id': self.gate['id'],
            'barcode_number': self.generate_barcode_number(),
            'is_member': 0
        }

        self.save_data(data)
        self.print_ticket(data)

        with Serial(self.gate['controller_ip_address'], int(self.gate['controller_port']), timeout=1) as s:
            s.write('AZ123')

class GateInApp(App):

    def build(self):
        return sm

sm = ScreenManager()
screen = [LoginScreen(name='login'), GateInScreen(name='gate-in')]
for s in screen:
    sm.add_widget(s)

if __name__ == '__main__':
    GateInApp().run()
