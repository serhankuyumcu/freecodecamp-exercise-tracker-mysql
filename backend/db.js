const mysql = require("mysql");
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: "",
    database: process.env.database,
    port: process.env.port,
  });
  db.connect((err, result) => {
    if (err) {
      return err;
    }
    console.log("db connected");
  });
  module.exports = db;