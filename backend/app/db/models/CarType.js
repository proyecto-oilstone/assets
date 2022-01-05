const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class CarType extends Model {}
  CarType.init(
    {
      marca: { type: DataTypes.STRING, allowNull: false },
      modelo: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "CarType" }
  );
};
