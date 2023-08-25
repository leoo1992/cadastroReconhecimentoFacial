"use strict";
const sequelize = require('sequelize');

const Controlador = sequelize.define("Controlador", {
  id: {
    allowNull: false,
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tokenAutorizacao: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Controlador;
