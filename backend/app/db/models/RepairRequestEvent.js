const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class RepairRequestEvent extends Model {}
  RepairRequestEvent.init(
    {
      estimatedDate: { type: DataTypes.STRING, allowNull: true }, // yyyy-mm-dd
      endDate: { type: DataTypes.STRING, allowNull: true }, // yyyy-mm-dd when repair is finished
    },
    { sequelize: sequelize, modelName: "RepairRequestEvent", timestamps: false }
  );
  RepairRequestEvent.type = "REPAIR_REQUEST";
};
