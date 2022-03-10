const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class SeguroEvent extends Model {}
  SeguroEvent.init(
    {
      expirationDate: { type: DataTypes.STRING, allowNull: true }, // yyyy-mm-dd
      Seguro:{ type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { sequelize: sequelize, modelName: "SeguroEvent", timestamps: false }
  );
  SeguroEvent.type = "SEGURO";
};
