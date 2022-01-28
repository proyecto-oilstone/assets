const express = require("express");
const controller = require("./controllers/events/workshopEvents");
const router = express.Router();

router.post("/", controller.postWorkshopEvent);
router.get("/car/:id", controller.getWorkshopEventsByCarId);

module.exports = router;
