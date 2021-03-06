const express = require("express");
const controller = require("./controllers/events/events");
const router = express.Router();

router.get("/car/:id", controller.getEventsByCarId);
router.get("/:id", controller.getEventById);
router.get("", controller.getAllEvents);

module.exports = router;
