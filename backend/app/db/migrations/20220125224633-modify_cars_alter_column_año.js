'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Cars', 'año', {
      type: DataTypes.STRING,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Cars', 'año', {
      type: DataTypes.STRING,
      defaultValue: "2000"
    });
  }
};
