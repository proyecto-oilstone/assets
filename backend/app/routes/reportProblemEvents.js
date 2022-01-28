const express = require("express");
const controller = require("./controllers/events/reportProblemEvents");
const router = express.Router();

router.post("/", controller.postReportProblemEvent);
router.get("/car/:id", controller.getReportProblemEventsByCarId);

module.exports = router;
