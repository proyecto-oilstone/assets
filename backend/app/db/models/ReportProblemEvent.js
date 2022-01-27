const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ReportProblemEvent extends Model {}
  ReportProblemEvent.init(
    {
      problem: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize: sequelize, modelName: "ReportProblemEvent", timestamps: false }
  );
};
