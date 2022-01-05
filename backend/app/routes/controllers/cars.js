const express = require("express");
const router = express.Router();
const postCar = require("./services/cars_services/postCar");
const getCars = require("./services/cars_services/getCars");

router.post("/nuevoAuto", postCar);
router.get("/autos", getCars);

module.exports = router;
