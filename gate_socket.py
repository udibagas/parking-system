import socket
import time
from serial import Serial
import requests
import logging
import os
import sys

API_URL = 'http://192.168.1.100/api'
IP_ADDRESS = '192.168.1.111'
GATE_CMD_OPEN = "A"
# GATE_CMD_OPEN = "AZ123"
GATE_CMD_CLOSE = "W"

if __file__ == "__main__":
    log_file = os.path.join(os.path.dirname(__file__), "gate.log")
    logging.basicConfig(filename=log_file, filemode='a', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

    try:
        r = requests.get('/parkingGate/search', params={ 'controller_ip_address': IP_ADDRESS }, timeout=3)
    except Exception as e:
        logging.error('Failed to get gate. Quit program.' + str(e))
        sys.exit()

    gate = r.json()[0]

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((gate['controller_ip_address'], int(gate['controller_port'])))
        s.listen()

        while True:
            conn, addr = s.accept()

            with conn:
                logging.info('Connected by ' + str(addr))

                while True:
                    data = conn.recv(1024)
                    if not data:
                        break

                    logging.debug('Command : ' + str(data))

                    if data == b'OPEN':
                        conn.sendall(b'OK')

                        try:
                            with Serial(gate['controller_device'], int(gate['controller_baudrate']), timeout=1) as ser:
                                ser.write(GATE_CMD_OPEN)
                                if GATE_CMD_CLOSE is not None:
                                    time.sleep(1)
                                    ser.write(GATE_CMD_CLOSE)
                        except Exception as e:
                            logging.error(str(e))
                        
                        logging.info("Gate opened")

                    else:
                        conn.sendall(b'Invalid command')
                        logging.error('Invalid command')
