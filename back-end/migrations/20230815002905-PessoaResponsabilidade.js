"use strict";
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require("sequelize");
const seedPessoaResponsabilidade = require("../seeders/PessoaResponsabilidadeSeeder");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await seedPessoaResponsabilidade();
    await queryInterface.createTable("PessoaResponsabilidade", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
    console.log("INITIALIZE UNDO: PessoaResponsabilidade");
    await queryInterface.dropTable("PessoaResponsabilidade");
    console.log("COMPLETE UNDO: PessoaResponsabilidade");
  },
};
