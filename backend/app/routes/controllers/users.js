const express = require("express");
const getUserDetail = require("./services/users_services/getUserDetail");
const getUsers = require("./services/users_services/getUsers");
const postUsers = require("./services/users_services/postUsers");
const putUser = require("./services/users_services/putUser");
const router = express.Router();

router.get("/users", getUsers);
router.post("/users", postUsers);
router.put("/users/:id", putUser);
router.get("/users/:id", getUserDetail);


module.exports = router;