#!/usr/bin/env python3

import sys
import logging
from time import time
from playsound import playsound
import requests
from serial import Serial
import time
from threading import Thread
from multiprocessing import Process


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


def read_controller(gate):
    connected = False

    while not connected:
        try:
            logging.debug(gate["nama"] + " : connecting to controller...")
            ser = Serial(gate["controller_ip_address"], int(gate["controller_port"]))
            connected = True
            logging.debug(gate["nama"] + " : controller connected")
        except Exception as e:
            time.sleep(3)
            logging.debug(gate["nama"] + " : Failed to connect to controller " + str(e))

    while True:
        logging.debug(gate["nama"] + " : reading controller...")

        # baca kontroller sampai kendaraan terdeteksi
        data = ser.read_until(b"*IN1ON#")
        logging.debug(gate["nama"] + " : Kendaraan terdeteksi " + data.decode())

        s = Process(target=playsound, args=("./audio/silakan-tekan-tombol.mp3",))
        s.start()

        data = ser.read_until(b"#")

        if s.is_alive():
            s.terminate()

        # kalau tap kartu
        if b"W" in data or b"X" in data:
            logging.debug(gate["nama"] + " : Tap kartu " + data.decode())
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
                logging.debug(gate["nama"] + " : Kartu invalid")
                playsound("./audio/kartu-invalid.mp3", False)
                continue

            if member["expired"]:
                logging.debug(gate["nama"] + " : Kartu expired")
                playsound("./audio/kartu-expired.mp3", False)
                continue

            if member["unclosed"]:
                logging.debug(gate["nama"] + " : Transaksi belum selesai")
                playsound("./audio/transaksi-belum-selesai.mp3", False)
                continue

            if not member["expired"] and member["expired_in"] <= 5:
                logging.debug(gate["nama"] + " : Kartu expired dalam 5 hari")
                playsound("./audio/expired-dalam-5hari.mp3", False)

            if not member["expired"] and member["expired_in"] == 1:
                logging.debug(gate["nama"] + " : Kartu expired dalam 1 hari")
                playsound("./audio/expired-dalam-1hari.mp3", False)

            trx = {
                "is_member": 1,
                "nomor_kartu": member["nomor_kartu"],
                "member_id": member["id"],
            }

            logging.info(gate["nama"] + " : Registered Card = " + member["nomor_kartu"])

        # tombol ditekan
        elif b"IN2ON" in data:
            logging.info(gate["nama"] + " : Tombol tiket ditekan " + data.decode())
            trx = {"is_member": 0}

        # Reset
        elif b"IN3" in data:
            logging.info(gate["nama"] + " : Reset" + data.decode())
            continue

        # tombol bantuan
        elif b"IN4ON" in data:
            logging.debug(gate["nama"] + " : Tombol bantuan" + data.decode())
            playsound("./audio/mohon-tunggu.mp3", False)
            send_notification(
                gate,
                "Pengunjung di " + gate["nama"] + " membutuhkan bantuan Anda ",
            )
            continue

        # kendaraan balik arah
        elif b"IN1OFF" in data:
            logging.info(gate["nama"] + " : Kendaraan balik arah " + data.decode())
            continue

        else:
            logging.info(gate["nama"] + " : Invalid input " + data.decode())
            continue

        trx["gate_in_id"] = gate["id"]
        trx["jenis_kendaraan"] = gate["jenis_kendaraan"]
        logging.debug(gate["nama"] + " : Simpan data")
        save_data(gate, trx)

        if trx["is_member"]:
            logging.debug(gate["nama"] + " : Ambil tiket")
            playsound("./audio/silakan-ambil-tiket.mp3", False)
        else:
            logging.debug(gate["nama"] + " : Terimkasih")
            playsound("./audio/terimakasih.mp3", False)

        # buka gate
        logging.debug(gate["nama"] + " : Buka gate")
        ser.write("*TRIG1#".encode())
        data = ser.read_until(b"*IN3OFF#")
        logging.info(gate["nama"] + " : Kendaraan masuk " + data.decode())


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
        Thread(target=read_controller, args=(gate,)).start()
