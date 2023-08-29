const sequelize = require("../config/sequelize");
(Log = require("../models/Log")),
  (Pessoa = require("../models/Pessoa")),
  (Controlador = require("../models/Controlador"));

const seedLog = async () => {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await Log.sync();

    const logData = [
      {
        data: new Date("2023-08-28 14:00:00"),
        PessoaId: 1,
        ControladorId: 1,
      },
      {
        data: new Date(),
        PessoaId: 1,
        ControladorId: 1,
      },
    ];
    await Log.bulkCreate(logData);
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("Dados de Log inseridos com sucesso.");
  } catch (err) {
    console.error("Erro ao inserir dados de Log:", err);
    console.log("Erro detalhado:", err);
  }
};
module.exports = seedLog;
