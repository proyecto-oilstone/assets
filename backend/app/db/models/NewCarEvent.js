const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class NewCarEvent extends Model {}
  NewCarEvent.init(
    {
    },
    { sequelize: sequelize, modelName: "NewCarEvent", timestamps: false }
  );
  NewCarEvent.type = "NEW_CAR";
};
