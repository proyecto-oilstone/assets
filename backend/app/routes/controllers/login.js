const express = require("express");
const postLogin = require("./services/login_services/postLogin");
const router = express.Router();

router.post("/login", postLogin);

module.exports = router;