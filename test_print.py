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
        '\xa6PR4', # start print command, baudrate 19200
        '\x1b\x61\x49', # align center
        'TIKET PARKIR\x0a',
        '\x1b\x21\x10', # double height
        'MITRATEKNIK',
        '\x0a\x0a', # 2x new line
        '\x1b\x21\x00', # normal height
        '\x1b\x61\x48', # align left
        'GATE'.ljust(10) + ' : GATE-IN-MOTOR',
        '\x0a', # new line
        'TANGGAL'.ljust(10) + ' : ' + time.strftime('%d %b %Y'),
        '\x0a', # new line
        'JAM'.ljust(10) + ' : ' + time.strftime('%T'),
        '\x0a\x0a', # 2x new line
        '\x1b\x61\x49', # align center
        '\x1d\x48\x50', # set barcode text = below
        '\x1d\x6b100', # set barcode height = 100
        '\x1d\x774', # set barcode width = 4
        '\x1d\x6b4ABC123\x00', #print barcode
        'Simpan tiket anda',
        '\x0a', # new line
        '\x1b\x69', # cut
        '\xa9' # end command
    ]

    s.sendall(str.encode(''.join(command)))
