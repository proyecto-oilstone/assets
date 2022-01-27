const express = require("express");
const getEventsByCarId = require("../services/event_services/getEventsByCarId");
const getEventDetail = require("../services/event_services/getEventDetail");
const router = express.Router();

router.get("/car/:id", getEventsByCarId);
router.get("/:id", getEventDetail);

module.exports = router;
