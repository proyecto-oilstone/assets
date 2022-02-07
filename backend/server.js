const express = require("express");
const app = express();
const routes = require("./app/routes/index.js");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Proyecto Oilstone</h2>",);
});

app.use("/api", routes)

module.exports = app