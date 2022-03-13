const express = require("express");
const controller = require("./controllers/events/repairRequestEvents");
const router = express.Router();

router.get("/car/:id", controller.getRepairRequestEventsByCarId);

module.exports = router;
