const { Router } = require("express");
const carsRouter = require("./controllers/cars");
const carTypeRouter = require("./controllers/carType");
const providerRouter = require("./controllers/provider");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const eventsRouter = require("./events");
const driverEventsRouter = require("./driverEvents");
const reportProblemEventsRouter = require("./reportProblemEvents");
const repairRequestEventsRouter = require("./repairRequestEvents");
const workshopEventsRouter = require("./workshopEvents");

const router = Router();

router.use("/cars", carsRouter);
router.use("/carType", carTypeRouter);
router.use("/provider", providerRouter);
router.use("/users", usersRouter);
router.use("/login",loginRouter)
router.use("/events/driver", driverEventsRouter);
router.use("/events/report-problems", reportProblemEventsRouter);
router.use("/events/repair-requests", repairRequestEventsRouter);
router.use("/events/workshop", workshopEventsRouter);
router.use("/events", eventsRouter);

module.exports = router;
