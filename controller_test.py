#!/usr/bin/env python3

import time
import socket
import sys

if len(sys.argv) == 1:
    print('Please specify device model: enet, compass')
    sys.exit()

if len(sys.argv) == 2:
    print('Please specify device ip')
    sys.exit()

if sys.argv[1] == 'enet':
    port = 4000
    prefix = b':'
    suffix = b';'

elif sys.argv[1] == 'compass':
    port = 5000
    prefix = b'\xa6'
    suffix = b'\xa9'

else:
    print('Invalid device model. Please choose either enet or compass')
    sys.exit()

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.settimeout(3)

    try:
        s.connect((sys.argv[2], port))
    except Exception:
        print('Failed to connect to controller')
        sys.exit()

    while True:
        cmd = input('> ')

        if cmd == 'quit' or cmd == 'exit':
            break

        s.sendall(b"".join([prefix, cmd.encode(), suffix]))
        print(':' + str(s.recv(64)))
