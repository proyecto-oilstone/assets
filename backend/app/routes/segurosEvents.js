const express = require("express");
const controller = require("./controllers/events/seguroEvents");
const router = express.Router();
const upload = require("../config/multer.config");

router.post("/", upload.single("seguro"), controller.postSeguroEvent);
router.put("/:id", upload.single("seguro"), controller.renove)

module.exports = router;
