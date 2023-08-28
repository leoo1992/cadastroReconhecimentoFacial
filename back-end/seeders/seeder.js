const controladorSeeder = require('./controladorSeeder');
const seedLog = require('./logSeeder');
const seedPessoa = require('./pessoaSeeder');
const seedPessoaResponsabilidade = require('./pessoaResponsabilidadeSeeder');

const seeder = async () => {
    try {
        console.log('Iniciando seeders...');
        console.log('Iniciando seeders do controlador...');
        await controladorSeeder();
        console.log('Iniciando seeders do log...');
        await seedLog();
        console.log('Iniciando seeders de pessoa...');
        await seedPessoa();
        console.log('Iniciando seeders de pessoaResponsabilidade...');
        await seedPessoaResponsabilidade();
        console.log('Seeders concluídos com sucesso.');
    } catch (err) {
        console.error('Erro ao executar seeders:', err);
        console.log('Erro detalhado:', err);
    }
};
module.exports = seeder;