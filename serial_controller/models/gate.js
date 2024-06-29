const SerialPort = require("serialport");
const Printer = require("./printer");
const player = require("./player");

class Gate {
  STATE_VEHICLE_IN = "LOOP1";
  STATE_VEHICLE_OUT = "LOOP2";

  port;
  state;

  constructor(id, nama, jenis_kendaraan, path, baudrate, printer) {
    this.id = id;
    this.nama = nama;
    this.jenis_kendaraan = jenis_kendaraan;
    this.path = path;
    this.baudrate = baudrate;
    this.printer = new Printer(printer.id, printer.nama, printer.path);
  }

  async reconnect() {
    try {
      await this.reload();

      if (this.port instanceof SerialPort) {
        this.port = null;
      }

      setTimeout(() => {
        try {
          this.scan();
        } catch (error) {
          console.error(`${this.nama} - ERROR - ${error.message}`);
        }
      }, 1000);
    } catch (error) {
      console.error(`${this.nama} - ERROR - ${error.message}`);
    }
  }

  scan() {
    const { nama, path, baudrate } = this;
    this.port = new SerialPort({ path, baudrate });
    console.log(`Connecting to gate ${nama}...`);

    this.port.on("open", () => {
      console.log(`Serial ${path} (${nama}) opened`);
    });

    const parser = this.port.pipe(
      new SerialPort.DelimiterParser({ delimiter: "#" })
    );

    parser.on("data", async (bufferData) => {
      const commands = ["LOOP1", "LOOP2", "STRUK", "EMRGN"];
      const data = bufferData.toString();
      console.log(`${nama} : ${data}`);

      // most likely will never happen
      if (!commands.includes(data)) return;

      if (this.state == this.STATE_VEHICLE_IN) {
        player.stopAndPlay(player.SELAMAT_DATANG);
        console.log(`${nama}: kendaraan masuk`);

        switch (data) {
          case "STRUK":
            console.log(`${nama}: tombol struk ditekan`);
            player.stopAndPlay(player.SILAKAN_AMBIL_TIKET);
            await saveDataAndOpenGate(this);
            player.stopAndPlay(player.TERIMAKASIH);
            break;

          case "EMRGN":
            console.log(`${nama}: tombol emergency ditekan`);
            player.stopAndPlay(player.MOHON_TUNGGU);
            break;

          default:
            break;
        }
      }

      this.state = data;
    });

    this.port.on("error", (error) => {
      console.error(`${nama} - ERROR - ${error.message}`);
      this.reconnect();
    });
  }

  open(delay = 0.5) {
    const command = "A".repeat(delay / 0.5);
    this.port.write(Buffer.from(`${command}\n`));
  }
}

module.exports = Gate;
