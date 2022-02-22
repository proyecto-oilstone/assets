const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Cars extends Model {}
  Cars.init(
    {
      patente: { type: DataTypes.STRING, allowNull: false, unique: true },
      año: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.INTEGER, allowNull: false },
      VTV: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
      seguro: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    },
    { sequelize: sequelize, modelName: "Cars" }
  );
};
