var Sound = require("aplay");

class Player extends Sound {
  SELAMAT_DATANG = "001.mp3";
  SILAKAN_AMBIL_TIKET = "002.mp3";
  TERIMAKASIH = "003.mp3";
  MOHON_TUNGGU = "004.mp3";

  stopAndPlay(audio) {
    if (!this.stopped) this.stop();
    this.play(`./sounds/${audio}`);
  }
}

module.exports = new Player();
