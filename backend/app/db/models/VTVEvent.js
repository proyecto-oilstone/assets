const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class VTVEvent extends Model {}
  VTVEvent.init(
    {
      expirationDate: { type: DataTypes.STRING, allowNull: true }, // yyyy-mm-dd
      VTV:{ type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { sequelize: sequelize, modelName: "VTVEvent", timestamps: false }
  );
  VTVEvent.type = "VTV";
};
