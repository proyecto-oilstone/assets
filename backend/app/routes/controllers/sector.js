const express = require("express");
const deleteSector = require("./services/sector_services/deleteSector");
const getSectorDetail = require("./services/sector_services/getSectorDetail");
const getSectors = require("./services/sector_services/getSectors");
const postSector = require("./services/sector_services/postSector");
const putSector = require("./services/sector_services/putSector");
const router = express.Router();

router.post("/sector", postSector)
router.get("/sector", getSectors)
router.get("/sector/:id", getSectorDetail)
router.delete("/sector/:id", deleteSector)
router.put("/sector/:id", putSector)

module.exports = router
