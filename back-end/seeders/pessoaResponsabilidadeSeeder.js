const sequelize = require('../config/sequelize'),
Pessoa = require('../models/Pessoa'),
PessoaResponsabilidade = require('../models/PessoaResponsabilidade');

const seedPessoaResponsabilidade = async () => {
    try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await PessoaResponsabilidade.sync();

        const pessoaResponsabilidadeData = [
            {
                FK_ResponsavelId: 1,
                FK_SubordinadoId: 1,
            },
            {
                FK_ResponsavelId: 1,
                FK_SubordinadoId: 1,
            },
        ];

        await PessoaResponsabilidade.bulkCreate(pessoaResponsabilidadeData);

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Dados de PessoaResponsabilidade inseridos com sucesso.');
    } catch (err) {
        console.error('Erro ao inserir dados de PessoaResponsabilidade:', err);
        console.log('Erro detalhado:', err);
    }
};

module.exports = seedPessoaResponsabilidade;


