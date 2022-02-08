const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Files extends Model {}
  Files.init(
    {
      document: { type: DataTypes.STRING, allowNull: true },
      type: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      data: { type: DataTypes.BLOB("long"), allowNull: false },
      expirationDate: { type: DataTypes.STRING, allowNull: false, defaultValue: "2022-01-01" }, // yyyy-mm-dd
    },
    { sequelize: sequelize, modelName: "Files" }
  );
};
