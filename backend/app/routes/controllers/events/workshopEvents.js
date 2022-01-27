const express = require("express");
const postWorkshopEvent = require("../services/event_services/workshop_event_services/postWorkshopEvent");
const getWorkshopEventsByCarId = require("../services/event_services/workshop_event_services/getWorkshopEventsByCarId");
const router = express.Router();

router.post("/", postWorkshopEvent);
router.get("/car/:id", getWorkshopEventsByCarId);

module.exports = router;
