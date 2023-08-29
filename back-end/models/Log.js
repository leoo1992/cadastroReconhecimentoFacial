"use strict";
const { DataTypes } = require('sequelize'),
  sequelize = require('../config/sequelize'),
  Controlador = require("./Controlador"),
  Pessoa = require("./Pessoa");

const Log = sequelize.define("Log", {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW,
  },
}, {
  tableName: "Log"
});

Log.belongsTo(Pessoa, { foreignKey: "PessoaId" });
Pessoa.hasMany(Log);

Log.belongsTo(Controlador, { foreignKey: "ControladorId" });
Controlador.hasMany(Log);
module.exports = Log;
