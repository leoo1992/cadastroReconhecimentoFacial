"use strict";
const { Sequelize, DataTypes } = require("sequelize");

const Controlador = require("./Controlador");
const Pessoa = require("./Pessoa");

const Log = sequelize.define("Log", {
  id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

Log.belongsTo(Pessoa, { foreignKey: "FK_PessoaId" });
Pessoa.hasMany(Log);

Log.belongsTo(Controlador, { foreignKey: "FK_ControladorId" });
Controlador.hasMany(Log);

module.exports = Log;
