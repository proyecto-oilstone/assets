const express = require("express");
const postReportProblemEvent = require("../services/event_services/report_problem_event_services/postReportProblemEvent");
const getReportProblemEventsByCarId = require("../services/event_services/report_problem_event_services/getReportProblemEventsByCarId");
const router = express.Router();

router.post("/", postReportProblemEvent);
router.get("/car/:id", getReportProblemEventsByCarId);

module.exports = router;
