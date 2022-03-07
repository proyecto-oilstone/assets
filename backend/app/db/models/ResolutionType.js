const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ResolutionType extends Model {}
  ResolutionType.init(
    {
      resolution: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "ResolutionType" }
  );
};
