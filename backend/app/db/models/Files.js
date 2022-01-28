const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Files extends Model {}
  Files.init(
    {
      document: { type: DataTypes.STRING, allowNull: true },
      type: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      data: { type: DataTypes.BLOB("long"), allowNull: false },
    },
    { sequelize: sequelize, modelName: "Files" }
  );
};
