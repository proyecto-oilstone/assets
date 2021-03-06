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

const { Cars, CarType, Provider, Files, Users, Sector, Event, DriverEvent, ReportProblemEvent, RepairRequestEvent, RepairedEvent, WorkshopEvent, VTVEvent, SeguroEvent, NewCarEvent, EditCarEvent, DischargedCarEvent, ProblemType, ResolutionType, Garage, LastRepairedEvent } = sequelize.models;

Cars.belongsTo(Sector)
Sector.hasMany(Cars)

Cars.belongsTo(Garage)
Garage.hasMany(Cars)

Files.hasOne(VTVEvent, { foreignKey: {name: "vtvFileId", allowNull: true}, targetKey: "id" });
Files.hasOne(SeguroEvent, { foreignKey: {name: "seguroFileId", allowNull: true}, targetKey: "id" });
Files.hasOne(ReportProblemEvent, { foreignKey: {name: "prmFileId", allowNull: true}, targetKey: "id" });
Files.hasOne(ReportProblemEvent, { foreignKey: {name: "dataFileId", allowNull: true}, targetKey: "id" });

Cars.hasMany(Files)
Files.belongsTo(Cars)

Cars.belongsTo(Provider);
Provider.hasMany(Cars);
 
Cars.belongsTo(CarType);
Cars.hasMany(Event, { foreignKey: {name: "carId", allowNull: false}, targetKey: "id" });
CarType.hasMany(Cars);

LastRepairedEvent.belongsTo(RepairedEvent, { foreignKey: {name: "repairedEventId", allowNull: false}, targetKey: "id" });
LastRepairedEvent.belongsTo(Cars, { foreignKey: {name: "carId", allowNull: false}, targetKey: "id" });

Event.belongsTo(Cars, { foreignKey: {name: "carId", allowNull: false}, targetKey: "id" });
Event.hasOne(DriverEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(ReportProblemEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(RepairedEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(RepairRequestEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(WorkshopEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(SeguroEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(VTVEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(NewCarEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(DischargedCarEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
Event.hasOne(EditCarEvent, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });

Event.childrenModels = [DriverEvent, ReportProblemEvent, RepairRequestEvent, WorkshopEvent, SeguroEvent, VTVEvent, RepairedEvent, NewCarEvent, DischargedCarEvent, EditCarEvent];
DriverEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
ReportProblemEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
RepairedEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
RepairRequestEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
WorkshopEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
VTVEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
SeguroEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
NewCarEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
DischargedCarEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });
EditCarEvent.belongsTo(Event, { foreignKey: {name: "id", allowNull: false}, targetKey: "id" });

ReportProblemEvent.belongsTo(Provider, { foreignKey: "providerId", targetKey: "id" });
RepairRequestEvent.belongsTo(ReportProblemEvent, { foreignKey: "problemId", targetKey: "id", onDelete: 'cascade' });
RepairedEvent.belongsTo(ReportProblemEvent, { foreignKey: "problemId", targetKey: "id" });
ReportProblemEvent.belongsTo(ProblemType, { foreignKey: "problemTypeId", targetKey: "id" });
RepairedEvent.belongsTo(ResolutionType, { foreignKey: "repairTypeId", targetKey: "id" });

ReportProblemEvent.include = [ProblemType];
RepairRequestEvent.include = [ReportProblemEvent];
RepairedEvent.include = [ReportProblemEvent, ResolutionType];
WorkshopEvent.include = [Garage];
DriverEvent.include = [Garage];

WorkshopEvent.belongsTo(Garage, { foreignKey: {name: "garageId", defautValue: null}, targetKey: "id" });
DriverEvent.belongsTo(Garage, { foreignKey: {name: "garageId", defautValue: null}, targetKey: "id" });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = {
  ...sequelize.models,
  db,
};
