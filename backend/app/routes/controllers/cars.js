const express = require("express");
const router = express.Router();
const postCar = require("./services/cars_services/postCar");
const getCars = require("./services/cars_services/getCars");
const putCar = require("./services/cars_services/putCar");
const deleteCar = require("./services/cars_services/deleteCar");
const { getCarById } = require("./cars/cars");

router.post("/nuevoAuto", postCar);
router.get("/autos", getCars);
router.put("/editAuto/:id", putCar)
router.get("/autos/:id", getCarById);
router.delete("/autos/:id", deleteCar)

module.exports = router;
