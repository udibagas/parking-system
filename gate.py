#!/usr/bin/env python3

import time
import asyncio
import websockets
from serial import Serial
import json
from escpos.printer import Usb


async def open_gate(websocket, path):
    while True:
        try:
            cmd = await websocket.recv()
        except Exception as e:
            continue

        cfg = cmd.split(';')

        # open gate
        if cfg[0] == 'open':
            try:
                ser = Serial(cfg[1], int(cfg[2]), timeout=1)
            except Exception as e:
                await websocket.send(json.dumps({"status": False, "message": "Gagal membuka gate " + str(e)}))
                continue

            try:
                ser.write(cfg[3].encode())

                if cfg[4] != '':
                    time.sleep(1)
                    ser.write(cfg[4].encode())

                ser.close()
                await websocket.send(json.dumps({"status": True, "message": "Gate berhasil dibuka"}))
            except Exception as e:
                await websocket.send(json.dumps({"status": False, "message": "Gate gagal dibuka " + str(e)}))

        # initialize printer
        elif cfg[0] == 'test_printer' or cfg[0] == 'print_ticket':
            try:
                p = Usb(0x1fc9, 0x2016)
            except Exception as e:
                await websocket.send(json.dumps({"status": False, "message": "Koneksi ke printer gagal " + str(e)}))
                return

        else:
            await websocket.send(json.dumps({"status": False, "message": "Perintah tidak dikenal"}))

        # test printer
        if cfg[0] == 'test_printer':
            try:
                p.set(align='center')
                p.text(cfg[2])
                p.cut()
                p.close()
                await websocket.send(json.dumps({"status": True, "message": "TEST PRINTER BERHASIL"}))
            except Exception as e:
                await websocket.send(json.dumps({"status": True, "message": "TEST PRINTER GAGAL. " + str(e)}))

        # print ticket
        if cfg[0] == 'print_ticket':

            try:
                p.set(align='center')
                p.image("./public/images/logo.jpeg")
                p.text("TIKET PARKIR\n")
                p.text(cfg[2] + "\n")  # location
                p.text(cfg[3] + "\n\n")  # address
                p.text('Rp. ' + cfg[4] + "\n")  # tarif
                # nomor plat / jenis kendaraan
                p.text(cfg[5] + '/' + cfg[6] + "\n\n")
                p.set(align='left')
                p.text('POS         : ' + cfg[7] + "\n")
                p.text('WAKTU MASUK : ' + cfg[8] + "\n")
                p.text('PETUGAS     : ' + cfg[9] + "\n")
                p.set(align='center')
                p.text("\n" + cfg[10] + "\n")
                p.cut()
                p.close()
                await websocket.send(json.dumps({"status": True, "message": "SILAKAN AMBIL TIKET"}))

            except Exception as e:
                await websocket.send(json.dumps({"status": True, "message": "PRINT TIKET GAGAL. " + str(e)}))


start_server = websockets.serve(open_gate, None, 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


# $ python -m websockets ws://127.0.0.1:5678/
