const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class WorkshopEvent extends Model {}
  WorkshopEvent.init(
    {},
    { sequelize: sequelize, modelName: "WorkshopEvent", timestamps: false }
  );
};
