const express = require("express");
const router = express.Router();
const postProvider = require("./services/provider_services/postProvider");

router.post("/provider", postProvider);

module.exports = router;
