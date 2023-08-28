"use strict";
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
const controladorSeeder = require('../seeders/controladorSeeder');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //alimentada
    await controladorSeeder(),
      await queryInterface.createTable("Controlador", {
        id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        tokenAutorizacao: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
  },

  down: async (queryInterface, Sequelize) => {
    console.log('INITIALIZE UNDO: Controlador');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.dropTable("Controlador");
    console.log('COMPLETE UNDO: Controlador');
  },
};
