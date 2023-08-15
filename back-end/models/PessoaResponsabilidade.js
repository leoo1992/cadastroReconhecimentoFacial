"use strict";
const { Sequelize, DataTypes } = require("sequelize");

const Pessoa = require("./Pessoa");

const PessoaResponsabilidade = sequelize.define("PessoaResponsabilidade", {
  id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

PessoaResponsabilidade.belongsTo(Pessoa, { foreignKey: "FK_ResponsavelId" });
Pessoa.hasMany(PessoaResponsabilidade);

PessoaResponsabilidade.belongsTo(Pessoa, { foreignKey: "FK_SubordinadoId" });
Pessoa.hasMany(PessoaResponsabilidade);

module.exports = PessoaResponsabilidade;
