"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Pessoa = sequelize.define(
  "Pessoa",
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    tipo: {
      type: DataTypes.ENUM("0", "1", "2", "3"),
      allowNull: false,
      defaultValue: "0",
    },
    ativo: {
      type: DataTypes.STRING,
      defaultValue: "0",
      allowNull: false,
    },
  },
  {
    tableName: "pessoa",
    timestamps: true,
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Pessoa;
