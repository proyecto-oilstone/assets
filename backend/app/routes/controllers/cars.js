const express = require("express");
const router = express.Router();
const postCar = require("./services/cars_services/postCar");
const getCars = require("./services/cars_services/getCars");
const putCar = require("./services/cars_services/putCar");

router.post("/nuevoAuto", postCar);
router.get("/autos", getCars);
router.put("/editAuto/:id", putCar)

module.exports = router;
