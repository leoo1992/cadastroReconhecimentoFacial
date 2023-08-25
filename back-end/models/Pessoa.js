"use strict";
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const sanitizeHtml = require('sanitize-html');
const { body, validationResult } = require('express-validator');

const Pessoa = sequelize.define("Pessoa", {
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
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Pessoa;

