const express = require("express");
const router = express.Router();
const postCar = require("./services/cars_services/postCar");
const getCars = require("./services/cars_services/getCars");
const deleteCar = require("./services/cars_services/deleteCar");
const controller = require("./cars/cars");
const getAllFilesByCarId = require("./services/cars_services/getAllFilesByCarId");

router.post("/nuevoAuto", postCar);
router.get("/autos", getCars);
router.put("/editAuto/:id", controller.editCarById);
router.get("/autos/:id", controller.getCarById);
router.delete("/autos/:id", deleteCar)
router.get("/:id/vtv", controller.downloadVTVByCarId);
router.get("/:id/seguro", controller.downloadSeguroByCarId);
router.get("/dashboard", controller.dashboardInfo);
router.put("/:id/finish-repair", controller.finishRepair);
router.get("/files/:id", getAllFilesByCarId)

module.exports = router;
