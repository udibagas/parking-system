#!/usr/bin/env python3

import time
import asyncio
import websockets
from serial import Serial
import json

async def open_gate(websocket, path):
    while True:
        try:
            cmd = await websocket.recv()
        except Exception as e:
            continue

        if (cmd[:4] == 'open'):
            cfg = cmd.split(';')
            try:
                ser = Serial(cfg[1], int(cfg[2]), timeout=1)
            except Exception as e:
                await websocket.send(json.dumps({"status" : False, "message": "Gagal membuka gate " + str(e)}))
                continue

            try:
                ser.write(cfg[3].encode())

                if cfg[4] != '':
                    time.sleep(1)
                    ser.write(cfg[4].encode())

                ser.close()
                await websocket.send(json.dumps({"status" : True, "message": "Gate berhasil dibuka"}))
            except Exception as e:
                await websocket.send(json.dumps({"status" : False, "message": "Gate gagal dibuka " + str(e)}))
        else:
            await websocket.send(json.dumps({"status" : False, "message": "Perintah tidak dikenal"}))

start_server = websockets.serve(open_gate, None, 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


# $ python -m websockets ws://127.0.0.1:5678/
