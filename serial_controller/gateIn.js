require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const fetch = require("cross-fetch");
const SerialPort = require("serialport");

const { DB_USER, DB_PASS, DB_NAME } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS);
let TOKEN;

class GateIn extends Model {
  port;
  state;

  STATE_VEHICLE_IN = "LOOP1";
  STATE_VEHICLE_OUT = "LOOP2";

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
    const {
      nama: name,
      controller_ip_address: path,
      controller_port: baudRate,
      jenis_kendaraan,
      id: gate_in_id,
    } = this;

    this.port = new SerialPort({ path, baudRate });
    console.log(`Connecting to gate ${name}...`);

    this.port.on("open", () => {
      console.log(`Serial ${path} (${name}) opened`);
    });

    const parser = this.port.pipe(
      new SerialPort.DelimiterParser({ delimiter: "#" })
    );

    parser.on("data", async (bufferData) => {
      const commands = ["LOOP1", "LOOP2", "STRUK", "EMRGN"];
      const command = bufferData.toString();
      console.log(`${name} : ${data}`);

      // most likely will never happen
      if (!commands.includes(data)) return;

      if (this.state == this.STATE_VEHICLE_IN) {
        // TODO: play selamat datang
        console.log(`${name}: kendaraan masuk`);

        switch (command) {
          case "STRUK":
            console.log(`${name}: tombol struk ditekan`);
            await saveDataAndOpenGate(this);
            // TODO: play silakan ambil ticket
            break;

          case "EMRGN":
            console.log(`${name}: tombol emergency ditekan`);
            // TODO: mohon tunggu petugas akan membantu anda
            break;

          default:
            break;
        }

        this.state = command;
      }
    });

    this.port.on("error", (error) => {
      console.error(`${name} - ERROR - ${error.message}`);
      this.reconnect();
    });
  }

  async saveDataAndOpenGate() {
    const { nama, jenis_kendaraan, id } = this;
    const payload = { is_member: 0, jenis_kendaraan, gate_in_id: id };

    try {
      const res = await fetch("http://localhost/parkingTransaction/apiStore", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const json = await res.json();
      if (res.statusText != "OK") throw new Error(json.message);
      console.log(`${nama}: ${JSON.stringify(json)}`);
      // open gate
      this.port.write(Buffer.from(`AAA\n`));
    } catch (error) {
      console.error(error.message);
    }
  }
}

GateIn.init(
  {
    nama: DataTypes.STRING,
    jenis_kendaraan: DataTypes.STRING,
    controller_ip_address: DataTypes.STRING,
    controller_port: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    shortcut_key: DataTypes.STRING,
    kamera: DataTypes.JSON,
    printer_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "GateIn",
    tableName: "gate_ins",
  }
);

async function login() {
  const payload = {
    email: "controller",
    password: "bismillah1@#$%",
    device_name: "parking_controller",
  };

  const res = await fetch("http://localhost/api/login", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  try {
    const data = await res.json();
    if (res.statusText !== "OK") throw new Error(data.message);
    return data.token;
  } catch (error) {
    throw error;
  }
}

(async () => {
  TOKEN = await login();
  const gates = await GateIn.findAll({ where: { status: true } });
  gates.forEach((gate) => {
    try {
      gate.scan();
    } catch (error) {
      console.error(error.message);
    }
  });
})();
