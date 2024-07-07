const pool = require("../config/db");

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS records (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      score INTEGER NOT NULL
    )
  `;
  await pool.query(query);
};

module.exports = {
  createTable,
};
