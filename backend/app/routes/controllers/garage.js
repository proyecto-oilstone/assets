const express = require("express");
const deleteGarage = require("./services/garage_services/deleteGarage");
const getGarageDetail = require("./services/garage_services/getGarageDetail");
const getGarages = require("./services/garage_services/getGarages");
const postGarage = require("./services/garage_services/postGarages");
const putGarage = require("./services/garage_services/putGarage");
const router = express.Router();

router.get("/garages", getGarages)
router.get("/garages/:id", getGarageDetail)
router.post("/garages", postGarage)
router.put("/garages/:id", putGarage)
router.delete("/garages/:id", deleteGarage)


module.exports = router;