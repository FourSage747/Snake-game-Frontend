const express = require("express");
const { getRecords, addRecord } = require("../controllers/gameController");
const router = express.Router();

router.get("/records", getRecords);
router.post("/records", addRecord);

module.exports = router;
