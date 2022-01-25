const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Users extends Model {}
  Users.init(
    {
      mail: { type: DataTypes.STRING, allowNull: false, unique: true },
      contraseña: { type: DataTypes.STRING, allowNull: false },
      nombre: { type: DataTypes.STRING, allowNull: false },
      apellido: { type: DataTypes.STRING, allowNull: false },
      telefono: { type: DataTypes.STRING, allowNull: false },
      rol: { type: DataTypes.STRING, allowNull: false },
      estado: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Users" }
  );
};