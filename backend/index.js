const express = require("express");
require("dotenv").config();
const app = express();
const routes = require("./app/routes/index.js");
const cors = require("cors");
const cron = require('node-cron');
const checkExpirationDates = require("./app/routes/controllers/services/cars_services/checkExpirationDates");

cron.schedule('0 0 0 * * *', checkExpirationDates); // every day at 00:00

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Proyecto Oilstone</h2>");
});

app.use("/api/v1", routes)

const { db } = require("./app/db/index");

db.sequelize
  .sync({ alter: true })
  .then(() => console.log("conexion a bd exitosa!"))
  .catch((e) => console.log(e));

const port = process.env.BACKEND_PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
