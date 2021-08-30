import asyncio
import logging
import requests

API_URL = "http://localhost/api"
API_HEADERS = None

# scan
INVENTORY1 = "06 FF 01 00 06"  # membaca TID
INVENTORY2 = "04 FF 0F"  # Membaca EPC


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
        logging.error("Failed to get uhf reader " + str(e))
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


async def uhf_reader(gate):
    reader, writer = await asyncio.open_connection(
        gate["uhf_reader_host"], gate["uhf_reader_port"]
    )

    while True:
        for cmd in [INVENTORY1, INVENTORY2]:
            command = crc(cmd)
            writer.write(command.encode())
            await writer.drain()

            data = await reader.read(64)
            logging.info(f"{gate['nama']} : {data.decode()}")


if __name__ == "__main__":
    log_file = "/var/log/parking.log"

    logging.basicConfig(
        filename=log_file,
        filemode="a",
        level=logging.DEBUG,
        format="%(asctime)s - %(levelname)s - %(message)s",
    )

    readers = get_uhf_readers()

    if not readers:
        logging.error("UHF Readers not found")

    for reader in readers:
        # gate = {"uhf_reader_ip_address": "192.168.1.190", "port": 9000}
        asyncio.run(uhf_reader(reader))
