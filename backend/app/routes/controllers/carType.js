const express = require("express");
const router = express.Router();
const postCarType = require("./services/carType_services/postCarType");

router.use("/carType", postCarType);

module.exports = router;
