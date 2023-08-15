"use strict";
const { Sequelize, DataTypes } = require("sequelize");

const Controlador = sequelize.define("Controlador", {
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
});

module.exports = Controlador;
