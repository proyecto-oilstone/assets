const express = require("express");
const postRepairRequestEvent = require("../services/event_services/repair_request_event_services/postRepairRequestEvent");
const getRepairRequestEventsByCarId = require("../services/event_services/repair_request_event_services/getRepairRequestEventsByCarId");
const router = express.Router();

router.post("/", postRepairRequestEvent);
router.get("/car/:id", getRepairRequestEventsByCarId);

module.exports = router;
