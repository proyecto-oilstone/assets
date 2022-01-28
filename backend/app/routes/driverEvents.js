const express = require("express");
const controller = require("./controllers/events/driverEvents");
const router = express.Router();

router.post("/", controller.postDriverEvent);
router.get("/car/:id", controller.getDriverEventsByCarId);

module.exports = router;
