const express = require("express");
const controller = require("./controllers/events/vtvEvents");
const router = express.Router();
const upload = require("../config/multer.config");

router.post("/", upload.single("vtv"), controller.postVTVEvent);
router.put("/:id", upload.single("vtv"), controller.renove)

module.exports = router;
