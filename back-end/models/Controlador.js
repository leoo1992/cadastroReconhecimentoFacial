"use strict";
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Controlador = sequelize.define("Controlador", {
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
}, {
  tableName: "controlador"
});
module.exports = Controlador;
