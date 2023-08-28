"use strict";
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
const seedPessoaResponsabilidade = require('../seeders/pessoaResponsabilidadeSeeder');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // alimentada
    await seedPessoaResponsabilidade(),
      await queryInterface.createTable("PessoaResponsabilidade", {
        id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      });
  },

  down: async (queryInterface, Sequelize) => {
    console.log('INITIALIZE UNDO: PessoaResponsabilidade');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.dropTable("pessoaresponsabilidade");
    console.log('COMPLETE UNDO: PessoaResponsabilidade');
  },
};
