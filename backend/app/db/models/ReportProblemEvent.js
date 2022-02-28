const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ReportProblemEvent extends Model {}
  ReportProblemEvent.init(
    {
      problem: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      resolved: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // if the report problem was resolved
      resolving: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // if the report problem is resolving
      data: { type: DataTypes.BLOB("long"), allowNull: true },
      data_name: { type: DataTypes.STRING, allowNull: true },
      data_type: { type: DataTypes.STRING, allowNull: true },
      prm: { type: DataTypes.BLOB("long"), allowNull: true },
      prm_name: { type: DataTypes.STRING, allowNull: true },
      prm_type: { type: DataTypes.STRING, allowNull: true },
    },
    { sequelize: sequelize, modelName: "ReportProblemEvent", timestamps: false }
  );
  ReportProblemEvent.type = "REPORT_PROBLEM";
};
