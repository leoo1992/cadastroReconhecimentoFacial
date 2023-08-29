const sequelize = require("../config/sequelize");
const Pessoa = require("../models/Pessoa");
const PessoaResponsabilidade = require("../models/PessoaResponsabilidade");

const seedPessoaResponsabilidade = async () => {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await PessoaResponsabilidade.sync();

    const pessoaResponsabilidadeData = [
      {
        ResponsavelId: 1,
        SubordinadoId: 1,
      },
      {
        ResponsavelId: 1,
        SubordinadoId: 2,
      },
    ];

    await PessoaResponsabilidade.bulkCreate(pessoaResponsabilidadeData);

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("Dados de PessoaResponsabilidade inseridos com sucesso.");
  } catch (err) {
    console.error("Erro ao inserir dados de PessoaResponsabilidade:", err);
    console.log("Erro detalhado:", err);
  }
};

module.exports = seedPessoaResponsabilidade;
