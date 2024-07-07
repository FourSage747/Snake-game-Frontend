const express = require("express");
const bodyParser = require("body-parser");
const gameRoutes = require("./routes/gameRoutes");
const { createTable } = require("./models/Record");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api", gameRoutes);

createTable();

module.exports = app;
