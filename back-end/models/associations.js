const Pessoa = require("./models/Pessoa");
const PessoaResponsabilidade = require("./models/PessoaResponsabilidade");

Pessoa.belongsToMany(Pessoa, {
  through: PessoaResponsabilidade,
  as: "Subordinados",
  foreignKey: "ResponsavelId",
});

Pessoa.belongsToMany(Pessoa, {
  through: PessoaResponsabilidade,
  as: "Responsaveis",
  foreignKey: "SubordinadoId",
});
