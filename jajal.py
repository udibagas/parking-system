import socket
import time

while True:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(3)
        try:
            s.connect(('192.168.1.100', 5000))
            while True:
                try:
                    s.sendall(b'\xa6STAT\xa9')
                    print(time.strftime('%T'), s.recv(32))
                    time.sleep(1)
                except Exception as e:
                    print(str(e))
                    #s.shutdown(socket.SHUT_WR)
                    break
        except Exception as e:
            print('reconnecting...')
            time.sleep(3)
