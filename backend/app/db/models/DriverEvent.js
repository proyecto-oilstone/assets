const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class DriverEvent extends Model {}
  DriverEvent.init(
    {
      driver: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "DriverEvent", timestamps: false }
  );
  DriverEvent.type = "DRIVER";
};
