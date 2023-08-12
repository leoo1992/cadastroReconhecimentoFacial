"use strict";
const { Sequelize, DataTypes } = require("sequelize");

const Pessoa = sequelize.define("Pessoa", {
  id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tipo: {
    type: Sequelize.ENUM("0", "1", "2", "3"),
    allowNull: false,
    defaultValue: "0",
  },
  ativo: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  dataNascimento: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Pessoa;
