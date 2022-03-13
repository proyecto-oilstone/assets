const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ReportProblemEvent extends Model {}
  ReportProblemEvent.init(
    {
      description: { type: DataTypes.TEXT, allowNull: true },
      resolved: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // if the report problem was resolved
      resolving: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // if the report problem is resolving
      estimatedDate: { type: DataTypes.STRING, allowNull: true }, // yyyy-mm-dd
      resolvedDate: { type: DataTypes.STRING, allowNull: true }, // yyyy-mm-dd when repair is finished
      resolvingDate: { type: DataTypes.STRING, allowNull: true }, // yyyy-mm-dd when resolving is true
    },
    { sequelize: sequelize, modelName: "ReportProblemEvent", timestamps: false }
  );
  ReportProblemEvent.type = "REPORT_PROBLEM";
};
