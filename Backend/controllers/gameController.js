const pool = require("../config/db");

const getRecords = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM records ORDER BY score DESC LIMIT 10"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addRecord = async (req, res) => {
  const { name, score } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO records (name, score) VALUES ($1, $2) RETURNING *",
      [name, score]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getRecords,
  addRecord,
};
