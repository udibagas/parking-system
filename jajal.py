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
                s.send(b'\xa6MT00008\xa9')
                time.sleep(5)
                s.send(b'\xa6MT00009\xa9')
                time.sleep(5)
                s.send(b'\xa6MT000010\xa9')
                time.sleep(5)
            except Exception as e:
                print(str(e))

            print(time.strftime('%T'), s.recv(32))
            time.sleep(1)

