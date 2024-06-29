const Gate = require("./gate");
const EscPosEncoder = require("@manhnd/esc-pos-encoder");
const { API_BASE, EMAIL, PASSWORD, DEVICE_NAME } = process.env;

class Api {
  static TOKEN;

  static async login() {
    const payload = {
      email: EMAIL,
      password: PASSWORD,
      device_name: DEVICE_NAME,
    };

    const res = await fetch(`${API_BASE}/login`, {
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
      this.TOKEN = data.token;
    } catch (error) {
      throw error;
    }
  }

  static async getGates() {
    const res = await fetch(`${API_BASE}/gateIn`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.TOKEN}`,
      },
      params: { status: true },
    });

    const data = await res.json();

    if (res.statusText !== "OK") throw new Error(data.message);

    return data.map((el) => {
      const {
        id,
        nama,
        jenis_kendaraan,
        controller_ip_address: path,
        controller_port: baudrate,
        printer,
      } = el;
      return new Gate(id, nama, jenis_kendaraan, path, baudrate, printer);
    });
  }

  static async saveDataAndOpenGate(gate) {
    const { nama, jenis_kendaraan, id } = gate;
    const payload = { is_member: 0, jenis_kendaraan, gate_in_id: id };

    try {
      const res = await fetch(`${API_BASE}/apiStore`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.TOKEN}`,
        },
      });

      const json = await res.json();
      if (res.statusText != "OK") throw new Error(json.message);
      console.log(`${nama}: ${JSON.stringify(json)}`);
      // open gate
      gate.port.write(Buffer.from(`AAA\n`)); // delay 1.5 detik
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = Api;
