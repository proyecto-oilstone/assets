const express = require("express");
const deleteGarage = require("./controllers/services/garage_services/deleteGarage");
const getGarages = require("./controllers/services/garage_services/getGarages");
const postGarage = require("./controllers/services/garage_services/postGarages");
const putGarage = require("./controllers/services/garage_services/putGarage");
const controller = require("./controllers/garage");
const router = express.Router();

router.get("/garages", getGarages)
router.get("/garages/:id", controller.getGarageDetail)
router.post("/garages", postGarage)
router.put("/garages/:id", putGarage)
router.delete("/garages/:id", deleteGarage)


module.exports = router;