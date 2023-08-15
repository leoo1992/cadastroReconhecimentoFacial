"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Logs", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tokenAutorizacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
        FK_PessoaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pessoa', 
          key: 'id', 
        },
      },
        FK_ControladorId: {
        type: Sequelize.INTEGER,
        references: {
        model: 'Controlador',
        key: 'id',
        },
      },
        createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
        updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Logs");
  },
};
