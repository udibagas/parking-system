#!/usr/bin/env python3

import socket
import time

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    #s.settimeout(10)
    try:
        s.connect(('192.168.1.101', 5000))
    except Exception as e:
        print(time.strftime('%T'), 'failed to connect...')

    command = [
        '\xa6PR4', # start print command, baudrate 9600
        '\x1b\x61\x01TIKET PARKIR\n', # align center
        '\x1b\x21\x10MITRATEKNIK\n\n', # double height
        '\x1b\x21\x00', # normal height
        '\x1b\x61\x00', # align left
        'GATE         : GATE-IN-MOTOR\n',
        'TANGGAL      : ' + time.strftime('%d %b %Y') + '\n',
        'JAM          : ' + time.strftime('%T') + '\n\n',
        '\x1b\x61\x01', # align center
        '\x1dhd', # set barcode height = 100, GS h 100
        '\x1dH\x02', # set barcode text = below, GS H 2
        '\x1dkE\x05AB123', # GS k 69 5 AB123
        '\nSimpan tiket anda\n',
        '\x1d\x56A', # full cut, add 3 lines: GS V 65
        '\xa9' # end command
    ]

    s.sendall(str.encode(''.join(command)))
    print(s.recv(1024))
    print(s.recv(1024))
