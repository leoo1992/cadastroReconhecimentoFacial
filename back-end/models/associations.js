const sequelize = require("../config/sequelize"),
  Pessoa = require("./Pessoa"),
  Log = require("./Log");

Pessoa.belongsToMany(Log, {
  through: "PessoaLog",
  foreignKey: "pessoaId",
  otherKey: "logId",
  unique: true,
});

Log.belongsToMany(Pessoa, {
  through: "PessoaLog",
  foreignKey: "logId",
  otherKey: "pessoaId",
  unique: true,
});

module.exports = sequelize;
