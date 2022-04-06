const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class EditCarEvent extends Model {}
  EditCarEvent.init(
    {
    },
    { sequelize: sequelize, modelName: "EditCarEvent", timestamps: false }
  );
  EditCarEvent.type = "EDIT_CAR";
};
