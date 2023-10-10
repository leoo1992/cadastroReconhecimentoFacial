"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Users = sequelize.define(
  "Users",
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Users;
