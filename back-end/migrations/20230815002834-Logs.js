"use strict";
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
const seedLog = require('../seeders/logSeeder');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //alimentada
    await seedLog(),
    await queryInterface.createTable("Logs", {
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
      dataNascimento: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      FK_PessoaId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Pessoa',
          key: 'id',
        },
      },
      FK_ControladorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Controlador',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    console.log('INITIALIZE UNDO: Logs');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.dropTable("Logs");
    console.log('COMPLETE UNDO: Logs');
  },
  
};

