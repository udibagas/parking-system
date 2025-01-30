"use strict";
const winston = require("winston");
const Transport = require("winston-transport");
const { default: axios } = require("axios");
const moment = require("moment");

const db = require("../config/db");
const Card = require("./card");
const Audio = require("./audio");
const RunningText = require("./runningText");
const MySocket = require("./mySocket");
const WebSocketTransport = require("../logger/WebsocketTransport");
const API_URL = "http://localhost/api";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      const formattedTimestamp = moment(timestamp).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      return `${formattedTimestamp} [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [new winston.transports.Console(), new WebSocketTransport()],
});

class GateIn {
  constructor({
    id,
    nama,
    jenis_kendaraan,
    controller_ip_address,
    controller_port,
    status,
    shortcut_key,
    kamera,
    printer_id,
    uhf_active,
  }) {
    this.id = id;
    this.nama = nama;
    this.jenis_kendaraan = jenis_kendaraan;
    this.controller_ip_address = controller_ip_address;
    this.controller_port = controller_port;
    this.status = !!status;
    this.shortcut_key = shortcut_key;
    this.kamera = kamera ? JSON.parse(kamera) : null;
    this.printer_id = printer_id;
    this.uhf_active = uhf_active;
    this.state = "idle";
    this.socket = new MySocket();
    this.audio = new Audio(this.socket);
    this.runningText = new RunningText(this.socket);
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM gate_ins";
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results.map((result) => new GateIn(result)));
      });
    });
  }

  reconnect() {
    this.socket.removeAllListeners();
    this.socket.destroy();

    setTimeout(() => {
      this.connect();
    }, 1000);
  }

  connect() {
    logger.info(`${this.nama}: Connecting to ${this.controller_ip_address}`);
    this.socket.connect(
      this.controller_port,
      this.controller_ip_address,
      () => {
        logger.info(
          `${this.nama}: Connected to ${this.controller_ip_address}:${this.controller_port}`
        );
      }
    );

    this.registerEventListeners();
  }

  registerEventListeners() {
    this.socket.on("connect", () => {
      logger.info(`${this.nama}: Connected`);
    });

    this.socket.on("data", (data) => {
      this.parseData(data);
    });

    this.socket.on("close", () => {
      logger.error(
        `${this.nama}: Connection closed. Reconnecting to ${this.nama}...`
      );
      this.reconnect();
    });

    this.socket.on("error", (err) => {
      logger.error(
        `${this.nama}: Connection error. Reconnecting to ${this.nama}...`
      );
      this.reconnect();
    });
  }

  async parseData(data) {
    logger.debug(`${this.nama}: ${data.toString("utf-8")}`);
    // remove header & footer
    const stringData = data.toString().slice(1, -1);

    // VEHICLE DETECTED
    if (stringData.slice(0, 5) === "IN1ON") {
      logger.info(`${this.nama}: Vehicle detected`);
      this.state = "vehicle_detected";
      this.audio.playWelcome();
      this.runningText.showWelcome();
    }

    // VEHICLE TURNED BACK
    if (stringData.slice(0, 6) === "IN1OFF") {
      logger.info(`${this.nama}: Vehicle turned back or in`);
      this.state = "idle";
    }

    // E-MONEY TAPPED
    if (stringData.slice(0, 2) === "PT") {
      logger.info(`${this.nama} E-Money detected`);
      if (this.state === "idle") return;
      await this.handleEMoney(data);
    }

    // MEMBER CARD TAPPED
    if (stringData[0] === "W") {
      logger.info(`${this.nama}: Member Card detected`);
      if (this.state === "idle") return;
      await this.handleMemberCard(stringData);
    }

    // TICKET BUTTON PRESSED
    if (stringData.slice(0, 5) === "IN2ON") {
      logger.info(`${this.nama}: Button ticket pressed`);
      if (this.state === "idle") return;
      await this.proceed();
    }

    // RESET BUTTON PRESSED
    if (stringData.slice(0, 3) === "IN3") {
      logger.info(`${this.nama}: Button reset pressed`);
      this.state = "idle";
    }

    // HELP BUTTON PRESSED
    if (stringData.slice(0, 5) === "IN4ON") {
      logger.info(`${this.nama}: Button help pressed`);
      if (this.state === "idle") return;
      this.runningText.showPleaseWait();
    }
  }

  openGate() {
    this.socket.sendCommand("TRIG1");
    logger.info(`${this.nama}: Gate opened`);

    setTimeout(() => {
      this.state = "idle";
    }, 3000);
  }

  async proceed(data = {}) {
    const transactionData = {
      gate_in_id: this.id,
      jenis_kendaraan: this.jenis_kendaraan,
      ...data,
    };

    logger.info(
      `${this.nama}: Proceeding with data: ${JSON.stringify(transactionData)}`
    );

    try {
      const { data } = await axios.post(
        `${API_URL}/parkingTransaction/apiStore`,
        transactionData
      );
      logger.info(
        `${this.nama}: ${data.message} - ${data.data.nomor_barcode} `
      );
      this.runningText.showThankYou();
      this.openGate();
    } catch (error) {
      logger.error(
        `${this.nama}: ${error.response?.data?.message || error.message}`
      );

      this.runningText.setText("GAGAL|SILAKAN HUBUNGI PETUGAS");
    }
  }

  async checkMembership(nomor_kartu, card_type) {
    try {
      const response = await axios.get(`${API_URL}/member/search`, {
        params: { nomor_kartu, card_type, status: 1 },
      });
      return response.data;
    } catch (error) {
      logger.error(
        `${this.nama}: ${error.response?.data?.message || err.message}`
      );
      return null;
    }
  }

  async handleMemberCard(data) {
    const cardData = data.slice(1);
    const cardNumber = parseInt(cardData, 16).toString();
    const member = await this.checkMembership(cardNumber, "RFID");

    if (!member) {
      this.runningText.setText("MAAF|KARTU TIDAK TERDAFTAR");
      this.audio.playCardUnregistered();
      return;
    }

    if (member.expired) {
      this.runningText.setText("MAAF|KARTU HABIS MASA BERLAKU");
      this.audio.playCardExpired();
      return;
    }

    if (member.unclosed) {
      this.runningText.setText("MAAF|KARTU BELUM SELESAI TRANSAKSI");
      this.audio.playUnclosedTransaction();
      return;
    }

    if (member.expired_in == 5) {
      this.runningText.setText("MASA BERLAKU KARTU HABIS DALAM|5 HARI");
      this.audio.playExpiredIn5Days();
    }

    if (member.expired_in == 1) {
      this.runningText.setText("MASA BERLAKU KARTU HABIS DALAM|1 HARI");
      this.audio.playExpiredIn1Day();
    }

    await this.proceed({
      is_member: 1,
      nomor_kartu: member.nomor_kartu,
      member_id: member.id,
    });
  }

  async handleEMoney(data) {
    const card = Card.create(data);
    logger.info(`${this.nama}: ${card}`);

    if (card.invalidCardNumber) {
      logger.error(`${this.nama}: Invalid card number`);
      return;
    }

    if (card.insufficientBalance) {
      logger.error(`${this.nama}: Saldo kosong`);
      return;
    }

    this.proceed({ nomor_kartu: card.number, is_member: 0 });
  }
}

module.exports = GateIn;
