const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class CarType extends Model {}
  CarType.init(
    {
      nombreLargo: { type: DataTypes.STRING, allowNull: false },
      nombreCorto: { type: DataTypes.STRING, allowNull: false },
      observaciones: { type: DataTypes.STRING, allowNull: true },
      type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    },
    { sequelize: sequelize, modelName: "CarType" }
  );
};
