const express = require("express");
const controller = require("./controllers/typeResolutions");
const router = express.Router();

router.post("/", controller.postTypeResolution);
router.put("/:id", controller.putTypeResolution);
router.get("/", controller.getAllTypeResolutions);
router.delete("/:id", controller.deleteTypeResolution);

module.exports = router;
