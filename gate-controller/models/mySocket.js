const { Socket } = require("net");

class MySocket extends Socket {
  sendCommand(command) {
    this.write(Buffer.from(`\xA6${command}\xA9`));
  }
}

module.exports = MySocket;
