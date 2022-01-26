const { Router } = require("express");
const carsRouter = require("./controllers/cars");
const carTypeRouter = require("./controllers/carType");
const providerRouter = require("./controllers/provider");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const filesRouter = require("./controllers/files");

const router = Router();

router.use("/cars", carsRouter);
router.use("/carType", carTypeRouter);
router.use("/provider", providerRouter);
router.use("/users", usersRouter);
router.use("/login",loginRouter)
router.use("/files", filesRouter)

module.exports = router;
