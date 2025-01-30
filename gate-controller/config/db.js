require("dotenv").config();
const { createPool } = require("mysql");
const {
  DB_HOST: host = "localhost",
  DB_PORT: port = 3306,
  DB_USER: user,
  DB_PASS: password,
  DB_NAME: database,
} = process.env;

const pool = createPool({
  connectionLimit: 10,
  host,
  port,
  user,
  password,
  database,
});

module.exports = pool;
