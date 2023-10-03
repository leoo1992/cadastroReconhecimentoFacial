"use strict";
const sequelize = require("../config/sequelize");
const Pessoa = require("./Pessoa");
const Log = require("./Log");


Pessoa.belongsToMany(Log, {
  through: "PessoaLog",
  foreignKey: "pessoaId",
  otherKey: "logId",
});

Log.belongsToMany(Pessoa, {
  through: "PessoaLog",
  foreignKey: "logId",
  otherKey: "pessoaId",
});



module.exports;
