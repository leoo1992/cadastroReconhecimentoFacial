"use strict";
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Pessoa", {
        id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cpf: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tipo: {
          type: DataTypes.ENUM("0", "1", "2", "3"),
          allowNull: false,
          defaultValue: "0",
        },
        ativo: {
          type: DataTypes.STRING,
          defaultValue: "0",
          allowNull: false,
        },
      });
  },

  down: async (queryInterface, Sequelize) => {
    console.log("INITIALIZE UNDO: Pessoa");
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryInterface.dropTable("Pessoa");
    console.log("COMPLETE UNDO: Pessoa");
  },
};
