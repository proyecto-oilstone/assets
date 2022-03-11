const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class RepairRequestEvent extends Model {}
  RepairRequestEvent.init(
    {
    },
    { sequelize: sequelize, modelName: "RepairRequestEvent", timestamps: false }
  );
  RepairRequestEvent.type = "REPAIR_REQUEST";
};
