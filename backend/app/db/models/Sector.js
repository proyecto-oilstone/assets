const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Sector extends Model {}
  Sector.init(
    {
      nombreLargo: { type: DataTypes.STRING, allowNull: false },
      nombreCorto: { type: DataTypes.STRING, allowNull: false },
      observaciones: { type: DataTypes.STRING, allowNull: true },
    },
    { sequelize: sequelize, modelName: "Sector" }
  );
};
