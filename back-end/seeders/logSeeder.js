const sequelize = require("../config/sequelize");
(Log = require("../models/Log"));

const seedLog = async () => {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await Log.sync();

    const logData = [
      {
        data: new Date(),
      },
      {
        data: new Date(),
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
