const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Provider extends Model {}
  Provider.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Provider" }
  );
};
