const express = require("express");
const controller = require("./controllers/events/repairRequestEvents");
const router = express.Router();

router.post("/", controller.postRepairRequestEvent);
router.get("/car/:id", controller.getRepairRequestEventsByCarId);

module.exports = router;
