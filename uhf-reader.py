#!/usr/bin/env python3

import asyncio
import logging
import requests
import sys
import time
import datetime
import websockets

API_URL = "http://localhost/api"
API_HEADERS = None

# scan
TID = "06 FF 01 00 06"  # membaca TID
EPC = "04 FF 0F"  # Membaca EPC


# crc
PRESET_Value = 0xFFFF
POLYNOMIAL = 0x8408


def login():
    global API_HEADERS

    data = {
        "email": "controller",
        "password": "bismillah1@#$%",
        "device_name": "parking_controller",
    }

    try:
        r = requests.post(API_URL + "/login", data=data)
    except Exception as e:
        logging.error("Login failed " + str(e))
        return False

    if r.status_code == 200:
        response = r.json()
        API_HEADERS = {"Authorization": "Bearer " + response["token"]}
        return True

    return False


def get_uhf_readers():
    try:
        r = requests.get(API_URL + "/uhfReaders", timeout=3, headers=API_HEADERS)
    except Exception as e:
        logging.error(f"Failed to get uhf reader {str(e)}")
        return False

    if r.status_code == 200:
        return r.json()

    return False


def check_card(nomor_kartu):
    try:
        r = requests.get(
            API_URL + "/parkingTransaction/search",
            params={"nomor_barcode": nomor_kartu},
            timeout=3,
            headers=API_HEADERS,
        )
    except Exception as e:
        logging.info(f"Failed to check card {str(e)}")
        return False

    if r.status_code == 200:
        return r.json()

    return False


def crc(cmd):
    cmd = bytes.fromhex(cmd)
    uiCrcValue = PRESET_Value
    for x in range((len(cmd))):
        uiCrcValue = uiCrcValue ^ cmd[x]
        for y in range(8):
            if uiCrcValue & 0x0001:
                uiCrcValue = (uiCrcValue >> 1) ^ POLYNOMIAL
            else:
                uiCrcValue = uiCrcValue >> 1
    crc_H = (uiCrcValue >> 8) & 0xFF
    crc_L = uiCrcValue & 0xFF
    cmd = cmd + bytes([crc_L])
    cmd = cmd + bytes([crc_H])
    return cmd


async def open_gate(gate):
    message = f'open;{gate["device"]};{gate["baudrate"]};{gate["open_command"]};{gate["close_command"]}'
    uri = f'ws://{gate["pos"]["ip_address"]}:5678'

    logging.debug(f'{gate["nama"]}: connecting to {gate["pos"]["ip_address"]}:5678')

    async with websockets.connect(uri) as ws:
        await ws.send(message)
        response = await ws.recv()
        logging.info(f'{gate["nama"]}: {response}')


def save_data(trx):
    try:
        r = requests.put(
            f"{API_URL}/parkingTransaction/{trx.id}",
            data=trx,
            timeout=3,
            headers=API_HEADERS,
        )
    except Exception as e:
        logging.error(f"Failed to save data {str(e)}")
        return False

    if r.status_code == 200:
        return r.json()

    return False


def take_snapshot(trx, gate):
    try:
        r = requests.post(
            f"{API_URL}/takeSnapshot/{trx.id}",
            data={"gate_out_id": gate["id"]},
            timeout=3,
            headers=API_HEADERS,
        )
    except Exception as e:
        logging.error(f"Failed to take snapshot {str(e)}")
        return False

    if r.status_code == 200:
        return r.json()

    return False


async def uhf_reader(gate):
    while True:
        logging.debug(
            f'{gate["nama"]}: Connecting to {gate["uhf_reader_host"]}:{gate["uhf_reader_port"]}...'
        )

        try:
            reader, writer = await asyncio.open_connection(
                gate["uhf_reader_host"], gate["uhf_reader_port"]
            )
        except Exception as e:
            logging.error(f' {gate["nama"]} : failed to connect to uhf reader')
            time.sleep(3)
            continue

        logging.info(f'{gate["nama"]}: connected to UHF reader')

        on_queue = ""

        while True:
            time.sleep(0.5)
            # send command
            writer.write(crc(EPC))
            await writer.drain()
            data = (await reader.read(64)).hex().upper()

            if not data:
                continue

            if len(data) < 40:
                continue

            card_number = str(int(data[28:34], 16))
            logging.info(f"{gate['nama']}: {data[28:34]} / {card_number}")

            # kalau di queue masih nomor yg sama baca ulang sampai dapat nomor yg baru
            if on_queue == card_number:
                continue

            on_queue = card_number
            trx = check_card(card_number)

            if not trx:
                logging.info(f'{gate["nama"]}: card {card_number} is not registered')
                continue  # re-run command

            if trx["member"]["expired"]:
                logging.info(f'{gate["nama"]}: card {card_number} expired')
                continue  # re-run command

            trx["time_out"] = datetime.datetime.now()
            trx["gate_out_id"] = gate["id"]
            trx["jenis_kendaraan"] = gate["jenis_kendaraan"]
            trx["plat_nomor"] = trx["member"]["vehicles"][0]["plat_nomor"]

            open_gate(gate)  # yang penting buka dulu, simpan belakangan
            save_data(trx)
            take_snapshot(trx, gate)
            # kasih jeda waktu yg reasonable buat mobil keluar
            time.sleep(3)
            # reset on queue biar bisa baca kartu lagi
            on_queue = ""


if __name__ == "__main__":
    logging.basicConfig(
        filename="/var/log/uhf.log",
        filemode="a",
        level=logging.DEBUG,
        format="%(asctime)s - %(levelname)s - %(message)s",
    )

    if not login():
        logging.info("Gagal login. Keluar dari aplikasi")
        sys.exit()

    readers = get_uhf_readers()

    if not readers:
        logging.error("UHF Readers not found")
        sys.exit()

    for reader in readers:
        asyncio.run(uhf_reader(reader))
