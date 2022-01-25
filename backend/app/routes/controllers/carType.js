const express = require("express");
const deleteCarType = require("./services/carType_services/deleteCarType");
const getCarTypeDetail = require("./services/carType_services/getCarTypedetail");
const getCarTypes = require("./services/carType_services/getCarTypes");
const router = express.Router();
const postCarType = require("./services/carType_services/postCarType");
const putCarType = require("./services/carType_services/putCarType");

router.post("/carType", postCarType);
router.put("/carType/:id", putCarType);
router.get("/carTypes", getCarTypes);
router.delete("/carTypes/:id", deleteCarType);
router.get("/carTypes/:id", getCarTypeDetail);

module.exports = router;
