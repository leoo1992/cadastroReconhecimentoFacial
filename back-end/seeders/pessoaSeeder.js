const sequelize = require("../config/sequelize"),
  Pessoa = require("../models/Pessoa");

const seedPessoa = async () => {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await Pessoa.sync();

    const pessoaData = [
      {
        nome: "João da Silva",
        cpf: "12345678901",
        tipo: "1",
        ativo: "0",
      },
      {
        nome: "Maria Oliveira",
        cpf: "98765432101",
        tipo: "1",
        ativo: "0",
      },
    ];
    await Pessoa.bulkCreate(pessoaData);
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("Dados de Pessoa inseridos com sucesso.");
  } catch (err) {
    console.error("Erro ao inserir dados de Pessoa:", err);
    console.log("Erro detalhado:", err);
  }
};

module.exports = seedPessoa;
