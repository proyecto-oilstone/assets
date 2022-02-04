const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Files extends Model {}
  Files.init(
    {
      document: { type: DataTypes.STRING, allowNull: true },
      type: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      data: { type: DataTypes.BLOB("long"), allowNull: false },
      expirationDate: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal("(now() at time zone 'utc')") },
    },
    { sequelize: sequelize, modelName: "Files" }
  );
};
