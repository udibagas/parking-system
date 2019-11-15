#!/usr/bin/env python3

import time
import socket
import sys

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.settimeout(3)
    try:
        s.connect(('192.168.1.100', 5000))
    except Exception:
        print('Failed to connect to controller')
        sys.exit()

    while True:
        cmd = input('> ')
        s.sendall(b"".join([b'\xa6', cmd.encode(), b'\xa9']))
        print(':' + str(s.recv(64)))
