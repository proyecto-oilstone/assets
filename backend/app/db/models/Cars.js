const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Cars extends Model {}
  Cars.init(
    {
      patente: { type: DataTypes.STRING, allowNull: false, unique: true },
      activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { sequelize: sequelize, modelName: "Cars" }
  );
};
