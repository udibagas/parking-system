#!/usr/bin/env python3

import socket
import selectors
import types
import requests
import json
import os
import logging
import logging.handlers
import time

GATE_IN_ADDR = '127.0.0.1'
GATE_IN_PORT = 9000

GATE_OUT_ADDR = '127.0.0.1'
GATE_OUT_PORT = 9000

API_URL = 'http://localhost:8000/api/'

# 0 = default
# 1 = detect kendaraan
# 2 = tombol dipencet atau detect kartu
# 3 = print struk
# 4 = ambil foto
# 5 = gate dibuka
# 0 = data disimpan ke server
state = 0;

def open_gate_in():
    logger.debug('Membuka gate')
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try
            s.connect((GATE_IN_ADDR, GATE_IN_PORT))
        except Exception as e:
            logger.error('Failed to connect to GATE IN controller ' + str(e))
        
        s.sendall(b':OUT1ON;')
        data = s.recv(65535)

        if (data == ':OUT11;'):
            logger.info('Gate berhasil dibuka')
            status = True
        else:
            logger.error('Gate gagal dibuka')
            status = False

def send_data_to_server():
    data = {
        'is_member': 0, # bukan member
        'vehicle_type': 2, # roda 2
        'status': status
    }

    logger.debug('Megirim data ke server...')

    try:
        r = requests.post(API_URL, data=data)
        logger.debug('Data berhasil disimpan ke database')
    except Exception as e
        logger.error('Gagal menyimpan data ke database. ' + str(e))

    logger.debug(r.json())

def play_welcome():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try
            s.connect((GATE_IN_ADDR, GATE_IN_PORT))
        except Exception as e:
            logger.error('Failed to connect to GATE IN controller ' + str(e))
        
        s.sendall(b':PLAYTRACK1;')
        data = s.recv(65535)
        logger.debug('Selamat datang...')

def ambil_foto():
    pass

def print_struk():
    pass

def process_incoming_data(recv_data):
    incoming_data = recv_data.decode("utf-8").rstrip()

    # sensor 
    if 'INP11' in incoming_data:
        logger.debug('Ada motor')
        state = 1
        play_welcome()

    # tombol dipencet
    if 'INP21' in incoming_data:
        logger.debug('Tombol dipencet')
        if (state == 0):
            return

        state = 2
        # print struk
        logger.debug('Print struk')
        print_struk()
        state = 3
        # ambil foto
        logger.debug('Ambil foto')
        ambil_foto()
        state = 4
        # tunggu 2 detik biar kertas keluar
        time.sleep(2)
        # buka gate
        open_gate_in()
        state = 5
        # simpan di database (via api)
        send_data_to_server()
        state = 0

    if 'INP31' in incoming_data:
        pass

    if 'INP41' in incoming_data:
        pass

    if 'INP10' in incoming_data:
        pass

    if 'INP20' in incoming_data:
        pass

    if 'INP30' in incoming_data:
        pass

    if 'W1' in incoming_data:
        data = { 'is_member': 1, 'card_id': incoming_data[2:] }

    if 'W2' in incoming_data:
        pass

def accept_wrapper(sock):
    conn, addr = sock.accept()
    message = 'accepted connection from ' + str(addr)
    logger.debug(message)
    # print('DEBUG: ' + message)
    conn.setblocking(False)
    data = types.SimpleNamespace(addr=addr, inb=b'', outb=b'')
    events = selectors.EVENT_READ | selectors.EVENT_WRITE
    sel.register(conn, events, data=data)


def service_connection(key, mask):
    sock = key.fileobj
    data = key.data
    if mask & selectors.EVENT_READ:
        recv_data = sock.recv(65535)
        if recv_data:
            process_incoming_data(recv_data)
            data.outb += recv_data
        else:
            message = 'closing connection to ' + str(data.addr)
            logger.debug(message)
            sel.unregister(sock)
            sock.close()
    if mask & selectors.EVENT_WRITE:
        if data.outb:
            sent = sock.send(data.outb)
            data.outb = data.outb[sent:]

def setup_log():
    log_level = {
        "NOTSET": 0,
        "DEBUG": 10,
        "INFO": 20,
        "WARNING": 30,
        "ERROR": 40,
        "CRITICAL": 50
    }

    handler = logging.handlers.RotatingFileHandler(
        os.path.join(os.path.dirname(__file__), 'parkir.log'), 
        maxBytes=1024000, 
        backupCount=100
    )
    handler.setLevel(log_level[config["log_level"]])
    handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))

    logger = logging.getLogger(__name__)
    logger.setLevel(log_level[config["log_level"]])
    logger.addHandler(handler)

if __name__ == "__main__":
    config_file_path = os.path.join(os.path.dirname(__file__), 'config.json')

    try:
        with open(config_file_path) as config_file:
            config = json.load(config_file)
    except Exception as e:
        print("ERROR: Gagal membuka file konfigurasi (config.json) " + str(e))
        exit()

    setup_log()

    sel = selectors.DefaultSelector()
    lsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
        lsock.bind((config["host"], int(config["port"])))
    except Exception as e:
        message = "Failed to bind socket: " + str(e) + " (" + config["host"] + ":" + config["port"] + ")"
        logger.error(message)
        # print('ERROR: ' + message)
        exit()

    lsock.listen()
    message = 'listening on ' + config["host"] + ':' + config["port"]
    logger.debug(message)
    # print('DEBUG: ' + message)
    lsock.setblocking(False)
    sel.register(lsock, selectors.EVENT_READ, data=None)

    while True:
        events = sel.select(timeout=None)
        for key, mask in events:
            if key.data is None:
                accept_wrapper(key.fileobj)
            else:
                service_connection(key, mask)
