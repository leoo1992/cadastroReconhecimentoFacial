require("dotenv").config();
const express = require("express"),
  bodyParser = require('body-parser'),
  sequelize = require("./config/sequelize"),
  cors = require("cors"),
  app = express(),
  port = 3000,
  Controlador = require('./models/Controlador'),
  Log = require('./models/Log'),
  Pessoa = require('./models/Pessoa'),
  PessoaResponsabilidade = require('./models/PessoaResponsabilidade');
const cadastroRoutes = require('./routes/cadastroPessoa');

app.use(cors());
app.use('/cadastro', cadastroRoutes);
app.use(express.json());
app.use(bodyParser.json());

console.log("Tentando conectar ao banco de dados...");
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida.");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Modelos sincronizados com o banco de dados.");
    app.listen(port, () => {
      console.log(`Servidor em execução na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ou sincronizar com o banco de dados:", err);
  });

