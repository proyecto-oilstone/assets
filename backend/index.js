const express = require("express");
require('dotenv').config()
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.get("/", (req, res) => {
    res.send("<h2>Proyecto Oilstone</h2>");
});

const db = require("./app/models");
db.sequelize
    .sync()
    .then(() => console.log("conexion a bd exitosa!"))
    .catch((e) => console.log(e));

const port = process.env.BACKEND_PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`) );