const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class SeguroEvent extends Model {}
  SeguroEvent.init(
    {
      type: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      data: { type: DataTypes.BLOB("long"), allowNull: false },
      expirationDate: { type: DataTypes.STRING, allowNull: true }, // yyyy-mm-dd
      Seguro:{ type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { sequelize: sequelize, modelName: "SeguroEvent", timestamps: false }
  );
  SeguroEvent.type = "SEGURO";
};
