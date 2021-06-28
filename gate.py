#!/usr/bin/env python3

import time
import asyncio
import websockets
from serial import Serial
import json
from escpos.printer import Serial as SerialPrinter


async def open_gate(websocket, path):
    while True:
        try:
            cmd = await websocket.recv()
        except Exception as e:
            continue

        cfg = cmd.split(';')

        if (cfg[0] == 'open'):
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

        elif (cfg[0] == 'test_printer'):
            cfg = cmd.split(';')
            try:
                p = SerialPrinter(devfile=cfg[1])
            except Exception as e:
                await websocket.send(json.dumps({"status": False, "message": "Koneksi ke printer gagal " + str(e)}))
                return

            try:
                p.set(align='center')
                p.text(cfg[2])
                p.cut()
            except Exception as e:
                await websocket.send(json.dumps({"status": True, "message": "Test printer berhasil."}))
                return

        elif (cfg[0] == 'print_ticket'):
            cfg = cmd.split(';')
            try:
                p = SerialPrinter(devfile=cfg[1])
            except Exception as e:
                await websocket.send(json.dumps({"status": False, "message": "Koneksi ke printer gagal " + str(e)}))
                return

            try:
                p.set(align='center')
                p.text(cfg[2])
                p.cut()
            except Exception as e:
                await websocket.send(json.dumps({"status": True, "message": "Silakan ambil tiket."}))
                return

        else:
            await websocket.send(json.dumps({"status": False, "message": "Perintah tidak dikenal"}))

start_server = websockets.serve(open_gate, None, 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


# $ python -m websockets ws://127.0.0.1:5678/
