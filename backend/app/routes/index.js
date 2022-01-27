const { Router } = require("express");
const carsRouter = require("./controllers/cars");
const carTypeRouter = require("./controllers/carType");
const providerRouter = require("./controllers/provider");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const eventsRouter = require("./controllers/events/events");
const driverEventsRouter = require("./controllers/events/driverEvents");
const reportProblemEventsRouter = require("./controllers/events/reportProblemEvents");
const repairRequestEventsRouter = require("./controllers/events/repairRequestEvents");
const workshopEventsRouter = require("./controllers/events/workshopEvents");

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
//TODO:
router.use("/events", eventsRouter);

module.exports = router;
