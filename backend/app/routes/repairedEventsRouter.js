const express = require("express");
const controller = require("./controllers/events/repairedEvents");
const router = express.Router();

router.get("/car/:id/latest", controller.getLatestRepairedByCarId);

module.exports = router;
