"use strict";
const { DataTypes } = require('sequelize'),
  sequelize = require('../config/sequelize'),
  Pessoa = require("./Pessoa");

const PessoaResponsabilidade = sequelize.define("PessoaResponsabilidade", {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  tableName: "pessoaresponsabilidade"
});

PessoaResponsabilidade.belongsTo(Pessoa, { foreignKey: "FK_ResponsavelId" });
Pessoa.hasMany(PessoaResponsabilidade);
PessoaResponsabilidade.belongsTo(Pessoa, { foreignKey: "FK_SubordinadoId" });
Pessoa.hasMany(PessoaResponsabilidade);

module.exports = PessoaResponsabilidade;
