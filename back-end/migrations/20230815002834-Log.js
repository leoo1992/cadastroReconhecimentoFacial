"use strict";
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require("sequelize");
const seedLog = require("../seeders/LogSeeder");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //alimentada
    await seedLog(),
      await queryInterface.createTable("Log", {
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
        ResponsavelId: {
          type: DataTypes.INTEGER,
          references: {
            model: "Pessoa",
            key: "id",
          },
        },
        SubordinadoId: {
          type: DataTypes.INTEGER,
          references: {
            model: "Pessoa",
            key: "id",
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
    console.log("INITIALIZE UNDO: Log");
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryInterface.dropTable("Log");
    console.log("COMPLETE UNDO: Log");
  },
};
