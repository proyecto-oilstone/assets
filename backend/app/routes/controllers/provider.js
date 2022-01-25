const express = require("express");
const deleteProvider = require("./services/provider_services/deleteProviders");
const getProviderDetail = require("./services/provider_services/getProviderDetail");
const getProvider = require("./services/provider_services/getProviders");
const router = express.Router();
const postProvider = require("./services/provider_services/postProvider");
const putProvider = require("./services/provider_services/putProvider");

router.post("/provider", postProvider);
router.put("/provider/:id", putProvider);
router.get("/providers", getProvider);
router.delete("/providers/:id", deleteProvider);
router.get("/providers/:id", getProviderDetail);

module.exports = router;
