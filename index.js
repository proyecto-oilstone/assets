const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("<h2>Proyecto Oilstone</h2>");
});

const db = require("./app/models");
db.sequelize
    .sync()
    .then(() => console.log("conexion a bd exitosa!"))
    .catch((e) => console.log(e));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`) );