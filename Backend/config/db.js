require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "foursage",
  host: "dpg-cq5a3ho8fa8c7383vkjg-a",
  database: "snakegame_qvvj",
  password: "8ovBYaSqaM5PMAWrON5rWKkElkp5wzPP",
  port: 5432,
});

module.exports = pool;
