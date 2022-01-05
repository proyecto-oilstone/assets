const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Cars extends Model {}
  Cars.init(
    {
      patente: { type: DataTypes.STRING, allowNull: false, unique: true },
      asignado: { type: DataTypes.STRING, allowNull: true },
      activo: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Cars" }
  );
};
