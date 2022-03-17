const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class RepairedEvent extends Model {}
  RepairedEvent.init(
    {
    },
    { sequelize: sequelize, modelName: "RepairedEvent", timestamps: false }
  );
  RepairedEvent.type = "REPAIRED";
};
