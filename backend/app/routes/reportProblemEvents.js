const express = require("express");
const controller = require("./controllers/events/reportProblemEvents");
const router = express.Router();
const upload = require("../config/multer.config");
router.post("/", upload.fields([
    { name: 'prm', maxCount: 1 },
    { name: 'data', maxCount: 1 }
]), controller.postReportProblemEvent);
router.get("/car/:id", controller.getReportProblemEventsByCarId);
router.put("/car/:id/resolving", controller.resolvingProblems);

module.exports = router;
