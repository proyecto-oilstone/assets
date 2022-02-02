const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class DriverEvent extends Model {}
  DriverEvent.init(
    {
      driver: { type: DataTypes.STRING, allowNull: true },
      isReserved: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false, },
    },
    { sequelize: sequelize, modelName: "DriverEvent", timestamps: false }
  );
  DriverEvent.type = "DRIVER";
};
