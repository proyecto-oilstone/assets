const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class VTVEvent extends Model {}
  VTVEvent.init(
    {
      type: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      data: { type: DataTypes.BLOB("long"), allowNull: false },
      expirationDate: { type: DataTypes.STRING, allowNull: true }, // yyyy-mm-dd
    },
    { sequelize: sequelize, modelName: "VTVEvent", timestamps: false }
  );
  VTVEvent.type = "VTV";
};
