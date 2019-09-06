#!/usr/bin/env python3

import socket
import time
from serial import Serial
import requests
import logging
import os
import sys

API_URL = 'http://192.168.1.6/api'
IP_ADDRESS = '192.168.1.13'
GATE_CMD_OPEN = b'AZ123'
GATE_CMD_CLOSE = None

log_file = os.path.join(os.path.dirname(__file__), "gate.log")
logging.basicConfig(filename=log_file, filemode='a', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    r = requests.get(API_URL + '/parkingGate/search', params={ 'controller_ip_address': IP_ADDRESS }, timeout=3)
except Exception as e:
    logging.error('Failed to get gate. Quit program.' + str(e))
    sys.exit()

gate = r.json()[0]
logging.info(gate)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((gate['controller_ip_address'], int(gate['controller_port'])))
    logging.info('Listen on ' + gate['controller_ip_address'] + ':' + str(gate['controller_port']))
    s.listen()

    while True:
        conn, addr = s.accept()
        logging.info('Connected by ' + str(addr))
        data = conn.recv(1024)
        logging.debug('Command : ' + str(data))

        if data == b'OPEN':
            try:
                ser = Serial(gate['controller_device'], int(gate['controller_baudrate']), timeout=1)
            except Exception as e:
                conn.sendall(b'GATE GAGAL DIBUKA ' + str(e))
                logging.error('Socket connection failed ' + str(e))
                continue

            try:
                ser.write(GATE_CMD_OPEN)

                if GATE_CMD_CLOSE is not None:
                    time.sleep(1)
                    ser.write(GATE_CMD_CLOSE)

                conn.sendall(b'OK')
                logging.info("Gate opened")
            except Exception as e:
                logging.error(str(e))
                conn.sendall(b'GATE GAGAL DIBUKA ' + str(e))
        else:
            conn.sendall(b'Invalid command')
            logging.error('Invalid command')
