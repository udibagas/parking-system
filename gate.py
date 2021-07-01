#!/usr/bin/env python3

import time
import asyncio
import websockets
from serial import Serial
import json
from escpos.printer import Usb


async def gate(websocket, path):
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
        elif cfg[0] == 'test_printer' or cfg[0] == 'print_ticket' or cfg[0] == 'print_report':
            try:
                p = Usb(0x1fc9, 0x2016)
            except Exception as e:
                await websocket.send(json.dumps({"status": False, "message": "KONEKSI KE PRINTER GAGAL " + str(e)}))
                return

        else:
            await websocket.send(json.dumps({"status": False, "message": "Perintah tidak dikenal"}))

        # test printer
        if cfg[0] == 'test_printer':
            try:
                p.set(align='center')
                p.image(
                    "/home/rsvp-motor/apps/parking-system/public/images/logo.jpeg")
                p.text("\n" + cfg[2])
                p.cut()
                await websocket.send(json.dumps({"status": True, "message": "TEST PRINTER BERHASIL"}))
            except Exception as e:
                await websocket.send(json.dumps({"status": False, "message": "TEST PRINTER GAGAL. " + str(e)}))

            p.close()

        # print ticket
        if cfg[0] == 'print_ticket':

            try:
                p.set(align='center')
                p.image(
                    "/home/rsvp-motor/apps/parking-system/public/images/logo.jpeg")
                p.text("TIKET PARKIR\n")
                # p.text(cfg[2] + "\n")  # location
                # p.text(cfg[3] + "\n\n")  # address
                p.set(align='left')
                p.text('TARIF       : Rp. ' + cfg[4] + "\n")  # tarif
                # nomor plat / jenis kendaraan
                p.text('NO. PLAT    : ' + cfg[5] + '/' + cfg[6] + "\n")
                #p.text('POS         : ' + cfg[7] + "\n")
                p.text('WAKTU MASUK : ' + cfg[8] + "\n")
                p.text('PETUGAS     : ' + cfg[9] + "\n")
                p.set(align='center')
                p.text("\n" + cfg[10])
                p.cut()
                await websocket.send(json.dumps({"status": True, "message": "SILAKAN AMBIL TIKET"}))

            except Exception as e:
                await websocket.send(json.dumps({"status": False, "message": "PRINT TIKET GAGAL. " + str(e)}))

            p.close()

        if cfg[0] == 'print_report':
            try:
                p.set(align='center')
                p.text(cfg[1])  # header
                p.set(align='left')
                p.text(cfg[2] + "\n")  # body laporan
                p.cut()
                await websocket.send(json.dumps({"status": True, "message": "SILAKAN AMBIL STRUK"}))

            except Exception as e:
                await websocket.send(json.dumps({"status": False, "message": "PRINT LAPORAN GAGAL. " + str(e)}))

            p.close()


start_server = websockets.serve(gate, None, 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


# $ python -m websockets ws://127.0.0.1:5678/
