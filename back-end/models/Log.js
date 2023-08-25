"use strict";
const { DataTypes } = require('sequelize'); // Importe o DataTypes do Sequelize

const Controlador = require("./Controlador");
const Pessoa = require("./Pessoa");


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
});

Log.belongsTo(Pessoa, { foreignKey: "FK_PessoaId" });
Pessoa.hasMany(Log);

Log.belongsTo(Controlador, { foreignKey: "FK_ControladorId" });
Controlador.hasMany(Log);

module.exports = Log;
