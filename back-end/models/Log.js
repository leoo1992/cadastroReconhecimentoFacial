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
  tableName: "logs"
});

Log.belongsTo(Pessoa, { foreignKey: "FK_PessoaId" });
Pessoa.hasMany(Log);

Log.belongsTo(Controlador, { foreignKey: "FK_ControladorId" });
Controlador.hasMany(Log);
module.exports = Log;
