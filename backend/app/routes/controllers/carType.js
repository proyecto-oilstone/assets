const express = require("express");
const getCarTypes = require("./services/carType_services/getCarTypes");
const router = express.Router();
const postCarType = require("./services/carType_services/postCarType");
const putCarType = require("./services/carType_services/putCarType");

router.post("/carType", postCarType);
router.put("/carType/:id", putCarType);
router.get("/carTypes", getCarTypes);

module.exports = router;
