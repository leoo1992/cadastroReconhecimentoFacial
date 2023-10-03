import seedPessoa from "./pessoaSeeder";

const seeder = async () => {
    console.log("Iniciando seeders...");
    await seedPessoa();
    console.log("Seeders concluídos com sucesso.");

};
export default seeder;
