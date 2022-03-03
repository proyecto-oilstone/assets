const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ProblemType extends Model {}
  ProblemType.init(
    {
      problem: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "ProblemType" }
  );
};
