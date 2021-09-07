#!/usr/bin/env python3

import socket

host = '192.168.1.190'
port = 6000

#####Perintah######
# scan
INVENTORY1 = '06 FF 01 00 06'  # membaca TID
INVENTORY2 = '04 FF 0F' #Membaca EPC


#crc
PRESET_Value = 0xFFFF
POLYNOMIAL = 0x8408
def crc(cmd):
    cmd = bytes.fromhex(cmd)
    uiCrcValue = PRESET_Value
    for x in range((len(cmd))):
        uiCrcValue = uiCrcValue ^ cmd[x]
        for y in range(8):
            if (uiCrcValue & 0x0001):
                uiCrcValue = (uiCrcValue >> 1) ^ POLYNOMIAL
            else:
                uiCrcValue = uiCrcValue >> 1
    crc_H = (uiCrcValue >> 8) & 0xFF
    crc_L = uiCrcValue & 0xFF
    cmd = cmd + bytes([crc_L])
    cmd = cmd + bytes([crc_H])
    return cmd

def send_cmd(cmd):
    s = socket.socket(socket.AF_INET,
                      socket.SOCK_STREAM)
    s.connect((host, port))
    message = crc(cmd)
    s.sendall(message)
    data = s.recv(64)
    response_hex = data.hex().upper()
    hex_list = [response_hex[i:i + 2] for i in range(0, len(response_hex), 2)]
    hex_space = ' '.join(hex_list)
    print(hex_space)
    s.close()

send_cmd(INVENTORY1)
send_cmd(INVENTORY2)
