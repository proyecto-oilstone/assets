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
const filesRouter = require("./controllers/files");
const sectorRouter = require("./controllers/sector");
const vtvRouter = require("./vtvEvents");
const segurosRouter = require("./segurosEvents");
const problemsTypesRouter = require("./problemsTypesRouter");
const resolutionsTypesRouter = require("./resolutionsTypesRouter");

const router = Router();

router.use("/cars", carsRouter);
router.use("/carType", carTypeRouter);
router.use("/problems-types", problemsTypesRouter);
router.use("/resolutions-types", resolutionsTypesRouter);
router.use("/provider", providerRouter);
router.use("/users", usersRouter);
router.use("/login",loginRouter)
router.use("/events/driver", driverEventsRouter);
router.use("/events/report-problems", reportProblemEventsRouter);
router.use("/events/repair-requests", repairRequestEventsRouter);
router.use("/events/workshop", workshopEventsRouter);
router.use("/events/vtv", vtvRouter);
router.use("/events/seguros", segurosRouter);
router.use("/events", eventsRouter);

router.use("/files", filesRouter)
router.use("/sector", sectorRouter)
module.exports = router;
