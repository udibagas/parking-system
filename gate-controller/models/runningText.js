class RunningText {
  constructor(socket) {
    this.socket = socket;
  }

  showWelcome() {
    this.setText("SELAMAT DATANG|TEKAN TOMBOL TIKET ATAU TEMPEL KARTU");
  }

  showPleaseWait() {
    this.setText("MOHON TUNGGU|PETUGAS AKAN MEMBANTU ANDA");
  }

  showThankYou() {
    this.setText("TERIMAKASIH|SIMPAN DENGAN BAIK TIKET PARKIR ANDA");
  }

  setText(text) {
    const line = text.split("|");
    this.socket.sendCommand(`DSD913003${line[0]}|13003${line[1]}`);

    setTimeout(() => {
      this.reset();
    }, 5000);
  }

  reset() {
    this.socket.sendCommand("DSU");
  }
}

module.exports = RunningText;
