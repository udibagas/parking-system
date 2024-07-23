var Sound = require("aplay");

class Player extends Sound {
  SELAMAT_DATANG =
    "001 - Selamat datang silakan tekan tombol hijau untuk tiket parkir anda atau gunakan kartu identitas anda untuk masuk.mp3";
  SILAKAN_AMBIL_TIKET = "002 - silakan ambil tiket terima kasih.mp3";
  TERIMAKASIH = "006 - terima kasih.mp3";
  MOHON_TUNGGU = "010 - Mohon Tunggu Security akan membukakan gate.mp3";

  stopAndPlay(audio) {
    if (!this.stopped) this.stop();
    this.play(`./sounds/${audio}`);
  }
}

module.exports = new Player();
