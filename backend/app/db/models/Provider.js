const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Provider extends Model {}
  Provider.init(
    {
      nombreLargo: { type: DataTypes.STRING, allowNull: false },
      nombreCorto: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      observaciones: { type: DataTypes.STRING, allowNull: true },
    },
    { sequelize: sequelize, modelName: "Provider" }
  );
};
