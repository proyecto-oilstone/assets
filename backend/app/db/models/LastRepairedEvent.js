const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class LastRepairedEvent extends Model { }
  LastRepairedEvent.init(
    {
      repairedEventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      carId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    { sequelize: sequelize, modelName: "LastRepairedEvent", timestamps: false }
  );
};
