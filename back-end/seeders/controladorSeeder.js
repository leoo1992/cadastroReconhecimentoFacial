const sequelize = require('../config/sequelize'),
    Controlador = require('../models/Controlador');

const seedControlador = async () => {
    try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await Controlador.sync();

        const controladorData = [
            {
                tokenAutorizacao: 'token_1',
            },
            {
                tokenAutorizacao: 'token_2',
            },
        ];
        await Controlador.bulkCreate(controladorData);
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Dados de Controlador inseridos com sucesso.');
    } catch (err) {
        console.error('Erro ao inserir dados de Controlador:', err);
        console.log('Erro detalhado:', err);
    }
};

module.exports = seedControlador;

