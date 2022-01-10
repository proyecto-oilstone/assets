const express = require("express");
const getProvider = require("./services/provider_services/getProviders");
const router = express.Router();
const postProvider = require("./services/provider_services/postProvider");
const putProvider = require("./services/provider_services/putProvider");

router.post("/provider", postProvider);
router.put("/provider/:id", putProvider);
router.get("/providers", getProvider);

module.exports = router;
