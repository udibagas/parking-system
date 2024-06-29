const Gate = require("./gate");
const { API_BASE, EMAIL, PASSWORD, DEVICE_NAME } = process.env;

class Api {
  static TOKEN;
  static SETTING;

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

  static async getSetting() {
    try {
      const res = await fetch(`${API_BASE}/setting`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.TOKEN}`,
        },
      });

      const data = await res.json();
      if (res.statusText !== "OK") throw new Error(data.message);
      this.SETTING = data;
    } catch (error) {
      console.error(error.message);
    }
  }

  static async getGates() {
    try {
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
    } catch (error) {
      console.error(error.message);
    }
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
      gate.printer.printTicket(json, gate, this.SETTING);
      gate.open(3);
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = Api;
