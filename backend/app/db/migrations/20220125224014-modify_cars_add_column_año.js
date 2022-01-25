'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Cars', 'año', {
      type: DataTypes.STRING,
      defaultValue: "2000"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cars', 'año');
  }
};
