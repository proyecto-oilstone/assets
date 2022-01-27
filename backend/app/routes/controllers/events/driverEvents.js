const express = require("express");
const postEvent = require("../services/event_services/driver_event_services/postDriverEvent");
const getEventDriverByCarId = require("../services/event_services/driver_event_services/getDriverEventsByCarId");
const router = express.Router();

router.post("/", postEvent);
router.get("/car/:id", getEventDriverByCarId);

module.exports = router;
