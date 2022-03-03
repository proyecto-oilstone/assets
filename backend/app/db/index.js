const { config } = require("../config/db.config.js");

const fs = require("fs");
const path = require("path");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

//Relaciones

const { Cars, CarType, Provider, Files, Users, Sector, Event, DriverEvent, ReportProblemEvent, RepairRequestEvent, WorkshopEvent, VTVEvent, SeguroEvent, ProblemType } = sequelize.models;

Cars.belongsTo(Sector)
Sector.hasMany(Cars)

Cars.hasMany(Files)
Files.belongsTo(Cars)

Cars.belongsTo(Provider);
Provider.hasMany(Cars);
 
Cars.belongsTo(CarType);
Cars.hasMany(Event, { foreignKey: {name: "carId", allowNull: false}, targetKey: "id" });
CarType.hasMany(Cars);

Event.belongsTo(Cars, { foreignKey: {name: "carId", allowNull: false}, targetKey: "id" });
Event.hasOne(DriverEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(ReportProblemEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(RepairRequestEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(WorkshopEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(SeguroEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(VTVEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });

Event.childrenModels = [DriverEvent, ReportProblemEvent, RepairRequestEvent, WorkshopEvent, SeguroEvent, VTVEvent];
DriverEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
ReportProblemEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
RepairRequestEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
WorkshopEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
VTVEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
SeguroEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });

RepairRequestEvent.belongsTo(ReportProblemEvent, { foreignKey: "problemId", targetKey: "id" });
RepairRequestEvent.belongsTo(Provider, { foreignKey: "providerId", targetKey: "id" });

WorkshopEvent.belongsTo(Provider, { foreignKey: {name: "providerId", allowNull: false}, targetKey: "id" });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = {
  ...sequelize.models,
  db,
};
