const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql2");

app.use(cors());

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASENAME,
});

app.get("/list", function (req, res) {
  pool.query("SELECT * FROM dataman", (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connection to the database successful!");
  connection.release();
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5001");
});
