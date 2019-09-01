import socket
import time
from serial import Serial

def get_gate_info():
    # TODO: get gate where status = active, type: OUT, ip_address = sama dengan ip computer ini
    pass

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind(('127.0.0.1', 5000))
    s.listen()

    while True:
        conn, addr = s.accept()

        with conn:
            print('Connected by', addr)

            while True:
                data = conn.recv(32)
                if not data:
                    break

                print(str(data))

                if data == b'OPEN':
                    conn.sendall(b'OK')

                    try:
                        with Serial('/dev/ttyS0', 2400, timeout=1) as s:
                            s.write('A')
                            time.sleep(1)
                            s.write('W')
                    except Exception as e:
                        print(str(e))

                else:
                    conn.sendall(b'INVALID COMMAND')
