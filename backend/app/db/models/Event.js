const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Event extends Model {}
  Event.init(
    {
      type: { type: DataTypes.INTEGER, allowNull: false },
      kilometres: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    },
    { sequelize: sequelize, modelName: "Event" }
  );
};
