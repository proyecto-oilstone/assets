const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class DischargedCarEvent extends Model {}
  DischargedCarEvent.init(
    {
    },
    { sequelize: sequelize, modelName: "DischargedCarEvent", timestamps: false }
  );
  DischargedCarEvent.type = "DISCHARGED_CAR";
};
