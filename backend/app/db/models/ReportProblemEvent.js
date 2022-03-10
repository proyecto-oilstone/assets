const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ReportProblemEvent extends Model {}
  ReportProblemEvent.init(
    {
      description: { type: DataTypes.TEXT, allowNull: true },
      resolved: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // if the report problem was resolved
      resolving: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // if the report problem is resolving
    },
    { sequelize: sequelize, modelName: "ReportProblemEvent", timestamps: false }
  );
  ReportProblemEvent.type = "REPORT_PROBLEM";
};
