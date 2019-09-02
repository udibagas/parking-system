import socket
import time

while True:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(3)

        try:
            s.connect(('192.168.1.100', 5000))
        except Exception as e:
            print(time.strftime('%T'), 'reconnecting...')
            time.sleep(3)
            continue
        except KeyboardInterrupt:
            break

        while True:
            try:
                s.sendall(b'\xa6STAT\xa9')
            except Exception as e:
                print(str(e))

            print(time.strftime('%T'), s.recv(32))
            time.sleep(1)

