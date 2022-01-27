const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Event extends Model {}
  Event.init(
    {
      type: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Event" }
  );
};
