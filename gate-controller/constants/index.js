const cardTypes = {
  "01": "STI Luminos Card",
  "02": "eMoney Mandiri Card",
  "03": "Brizzi BRI Card",
  "04": "Tapcash BNI Card",
  "05": "Flazz BCA Card",
  "06": "Jakcard DKI Card",
  "07": "Bank Nobu Card",
  "08": "Bank Mega Card",
  FF: "Type A or Mifare Card",
};

const validityFlags = {
  "00": "Card number is invalid",
  "01": "Card number is valid, but card balance is invalid",
  "02": "Card balance is valid, but card number is invalid",
  "03": "Both card number and card balance is valid",
};

const statusCodes = {
  "00000000": "Command success",
  "00011001": "General error",
  "00011002": "Reader waiting timeout",
  "00011003": "Reader initialization failed (Incorrect key)",
  "00011004": "Not enough balance",
  "00011005":
    "Reader found lost contact on card transaction /interrupted transaction",
  "00011006":
    "Reader expected card from previous transaction (for auto correction purpose)",
  "00011007": "Deduct Interval less than n second (default 2 sec)",
};

const INVALID_CARD = "00";
const INVALID_BALANCE = "01";
const INVALID_CARD_NUMBER = "02";
const VALID = "03";

const SIZE_SMALL = "01";
const SIZE_MEDIUM = "02";
const SIZE_LARGE = "03";

const COLOR_BLACK = "01";
const COLOR_WHITE = "02";
const COLOR_RED = "03";
const COLOR_GREEN = "04";
const COLOR_BLUE = "05";

module.exports = {
  cardTypes,
  validityFlags,
  statusCodes,
  INVALID_CARD,
  INVALID_BALANCE,
  INVALID_CARD_NUMBER,
  VALID,
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_BLUE,
  COLOR_RED,
  COLOR_GREEN,
  SIZE_SMALL,
  SIZE_MEDIUM,
  SIZE_LARGE,
};
