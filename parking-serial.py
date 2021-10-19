#!/usr/bin/env python3

import asyncio
import sys
import logging
from playsound import playsound
import requests
from serial_asyncio import open_serial_connection


API_URL = "http://localhost/api"
API_HEADERS = None


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


def get_gates():
    try:
        r = requests.get(
            API_URL + "/gateIn", params={"status": 1}, timeout=3, headers=API_HEADERS
        )
    except Exception as e:
        logging.error("Failed to get gates " + str(e))
        return False

    if r.status_code == 200:
        return r.json()

    return False


def check_card(gate, nomor_kartu, card_type="RFID"):
    payload = {"nomor_kartu": nomor_kartu, "status": 1, "card_type": card_type}
    try:
        r = requests.get(
            API_URL + "/member/search", params=payload, timeout=3, headers=API_HEADERS
        )
    except Exception as e:
        logging.info(gate["nama"] + " : Failed to check card " + str(e))
        return False

    if r.status_code == 200:
        return r.json()

    return False


def send_notification(gate, message):
    notification = {"message": message}

    try:
        requests.post(
            API_URL + "/gateIn/notification/" + str(gate["id"]),
            data=notification,
            timeout=3,
            headers=API_HEADERS,
        )
    except Exception as e:
        logging.info(gate["nama"] + " : Failed to send notification " + str(e))
        return False

    return True


def save_data(gate, data):
    try:
        r = requests.post(
            API_URL + "/parkingTransaction/apiStore",
            data=data,
            timeout=3,
            headers=API_HEADERS,
        )
    except Exception as e:
        logging.info(gate["nama"] + " : Failed to save data " + str(e))
        send_notification(
            gate, "Pengunjung di " + gate["nama"] + " membutuhkan bantuan Anda"
        )
        return False

    return r.json()


async def read_controller(gate):
    connected = False

    while not connected:
        try:
            reader, writer = await open_serial_connection(
                url=gate["controller_ip_address"], baudrate=gate["controller_port"]
            )
            connected = True
        except Exception as e:
            logging.debug(gate["nama"] + " : Failed to connect to controller " + str(e))

    while True:
        data = await reader.read(1024)

        # kendaraan terdeteksi
        if b"IN1ON" in data:
            playsound("./audio/silakan-tekan-tombol.mp3")

            data = await reader.read(1024)

            # kalau tap kartu
            if b"W" in data or b"X" in data:
                delimiter = "W"
                card_type = "RFID"

                if b"X" in data:
                    delimiter = "X"
                    card_type = "UHF"

                nomor_kartu = str(data).split(delimiter)[1].split("#")[0]

                logging.debug(
                    gate["nama"]
                    + " : Card Detected "
                    + str(int(nomor_kartu, 16))
                    + " "
                    + card_type
                )

                member = check_card(gate, str(int(nomor_kartu, 16)), card_type)

                if not member:
                    playsound("./audio/kartu-invalid.mp3")
                    continue

                if member["expired"]:
                    playsound("./audio/kartu-expired.mp3")
                    continue

                if member["unclosed"]:
                    playsound("./audio/transaksi-belum-selesai.mp3")
                    continue

                if not member["expired"] and member["expired_in"] <= 5:
                    playsound("./audio/expired-dalam-5hari.mp3")

                if not member["expired"] and member["expired_in"] == 1:
                    playsound("./audio/expired-dalam-1hari.mp3")

                data = {
                    "is_member": 1,
                    "nomor_kartu": member["nomor_kartu"],
                    "member_id": member["id"],
                }

                logging.info(
                    gate["nama"] + " : Registered Card = " + member["nomor_kartu"]
                )

            # tombol ditekan
            elif b"IN2ON":
                data = {"is_member": 0}

            # Reset
            elif b"IN3":
                logging.info(gate["nama"] + " : Reset")
                continue

            # tombol bantuan
            elif b"IN4ON":
                playsound("./audio/mohon-tunggu.mp3")
                send_notification(
                    gate,
                    "Pengunjung di " + gate["nama"] + " membutuhkan bantuan Anda",
                )
                continue

            # kendaraan balik arah
            elif b"IN1OFF":
                logging.info(gate["nama"] + " : Vehicle turn back")
                continue

            else:
                asyncio.sleep(1)
                continue

            data["gate_in_id"] = gate["id"]
            data["jenis_kendaraan"] = gate["jenis_kendaraan"]
            save_data(gate, data)

            if data["is_member"]:
                playsound("./audio/silakan-ambil-tiket.mp3")
            else:
                playsound("./audio/terimakasih.mp3")

            # buka gate
            writer.write("*TRIG1#".encode())
            await writer.drain()

            counter = 0

            while counter < 5:
                data = reader.read(1024)

                if b"IN3OFF" in data:
                    logging.info(gate["nama"] + " : Kendaraan masuk")
                    break

                counter += 1


if __name__ == "__main__":
    log_file = "/var/log/parking.log"
    logging.basicConfig(
        filename=log_file,
        filemode="a",
        level=logging.DEBUG,
        format="%(asctime)s - %(levelname)s - %(message)s",
    )

    auth = login()

    if auth == False:
        logging.info("Gagal login. Keluar dari aplikasi")
        sys.exit()

    gates = get_gates()

    if gates == False:
        logging.info("Tidak ada gate. Keluar dari aplikasi")
        sys.exit()

    logging.info("Gate : " + ", ".join(map(lambda x: x["nama"], gates)))
    logging.info("Memulai aplikasi...")

    for gate in gates:
        # asyncio.get_event_loop().run_until_complete(read_controller, (gate,))
        # asyncio.get_event_loop().run_forever()
        asyncio.run(read_controller(gate))
