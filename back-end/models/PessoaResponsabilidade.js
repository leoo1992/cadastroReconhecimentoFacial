"use strict";
const { DataTypes } = require("sequelize"),
  sequelize = require("../config/sequelize"),
  Pessoa = require("./Pessoa");

const PessoaResponsabilidade = sequelize.define(
  "PessoaResponsabilidade",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    ResponsavelId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Pessoa",
        key: "id",
      },
    },
    SubordinadoId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Pessoa",
        key: "id",
      },
    },
  },
  {
    tableName: "PessoaResponsabilidade",
  }
);

module.exports = PessoaResponsabilidade;
