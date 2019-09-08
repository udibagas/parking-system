#!/usr/bin/env python3

import socket
import time

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.settimeout(3)
    try:
        s.connect(('192.168.1.100', 5000))
    except Exception as e:
        print(time.strftime('%T'), 'failed to connect...')

    command = [
        '\xa6PR3', # start print command, baudrate 19200
        '\x1b\x61\x01', # align center
        'TIKET PARKIR\n',
        '\x1b\x21\x10MITRATEKNIK\n\n', # double height
        '\x1b\x21\x00', # normal height
        '\x1b\x61\x00', # align left
        'GATE    : GATE-IN-MOTOR\n',
        'TANGGAL : ' + time.strftime('%d %b %Y') + '\n',
        'JAM     : ' + time.strftime('%T') + '\n\n',
        '\x1b\x61\x01', # align center
        # '\x1d\x6bd', # set barcode height = 100
        '\x1d\x77\xa4', # set barcode width = 4, GS w 4
        '\x1d\x48\x50', # set barcode text = below
        '\x1d\x6b\x04', # GS k 4
        'ABC123'.encode(), # barcode
        '\x00', # NUL
        '\nSimpan tiket anda\n',
        '\x1d\x56A\x03', # full cut, add 3 lines: GS V 65 3
        '\xa9' # end command
    ]

    s.sendall(str.encode(''.join(command)))
    print(s.recv(1024))
