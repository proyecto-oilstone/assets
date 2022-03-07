const express = require("express");
const controller = require("./controllers/typeProblems");
const router = express.Router();

router.post("/", controller.postTypeProblem);
router.put("/:id", controller.putTypeProblem);
router.get("/", controller.getAllTypeProblems);
router.delete("/:id", controller.deleteTypeProblem);

module.exports = router;
