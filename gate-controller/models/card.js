const { validityFlags, cardTypes } = require("../constants");

class Card {
  constructor(
    type = "",
    uid = "",
    dataValidityFlag = "",
    number = "",
    balance = 0
  ) {
    this.type = type;
    this.uid = uid;
    this.dataValidityFlag = dataValidityFlag;
    this.number = number;
    this.balance = balance;
  }

  toJSON() {
    return {
      type: this.typeDescription,
      uid: this.uid,
      number: this.number,
      dataValidity: this.dataValidityFlagDescription,
      balance: this.balanceFormatted,
      isValid: this.isValid,
    };
  }

  static create(data) {
    // 02 0015020000008f441e1d 03 6032984031044294 00006f54 8e e money
    // 02 00150500000047bb9fc2 03 0145202200110508 00001194 6d flazz
    // 02 0015030456d5e2db7580 01 6013500467325578 00000000 03 bri

    data = data.toString("hex").slice(6, -4);
    const cardType = data.slice(0, 2);
    const cardUID = data.slice(2, 22);
    const cardDataValidityFlag = data.slice(22, 24);
    const cardNumber = data.slice(24, 40);
    const cardBalance = data.slice(40, 48);

    return new Card(
      cardType,
      cardUID,
      cardDataValidityFlag,
      cardNumber,
      parseInt(cardBalance, 16)
    );
  }

  reset() {
    this.type = "";
    this.uid = "";
    this.dataValidityFlag = "";
    this.number = "";
    this.balance = 0;
  }

  get typeDescription() {
    return cardTypes[this.type];
  }

  get insufficientBalance() {
    return this.dataValidityFlag === "01";
  }

  get invalidCardNumber() {
    return this.dataValidityFlag === "00" || this.dataValidityFlag === "02";
  }

  get isValid() {
    return this.dataValidityFlag === "03";
  }

  get dataValidityFlagDescription() {
    return validityFlags[this.dataValidityFlag];
  }

  get balanceFormatted() {
    return this.balance.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  }
}

module.exports = Card;
