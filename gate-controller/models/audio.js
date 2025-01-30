class Audio {
  constructor(socket) {
    this.socket = socket;
  }

  playCardUnregistered() {
    this.socket.sendCommand("MT00003");
  }

  playWelcome() {
    this.socket.sendCommand("MT00007");
  }

  playExpiredIn5Days() {
    this.socket.sendCommand("MT00011");
  }

  playExpiredIn1Day() {
    this.socket.sendCommand("MT00012");
  }

  playCardExpired() {
    this.socket.sendCommand("MT00013");
  }

  playUnclosedTransaction() {
    this.socket.sendCommand("MT00014");
  }
}

module.exports = Audio;
