const express = require("express");
const sequelize = require("./config/sequelize");
const cors = require("cors");
const Associations = require("./models/associations");
const app = express();
const port = 3000;
const moment = require('moment-timezone');

//IMPORTS AUTH
const loginRouter = require("./routes/Auth/login");

//IMPORTS USER
const cadastroUserRouter = require("./routes/User/cadastrosUsuario");
const pesquisarUserRouter = require("./routes/User/pesquisarUser");
const listarUserRouter = require("./routes/User/listarUser");
const imprimirUserRouter = require("./routes/User/imprimirUser");
const deletarUserByIdRouter = require("./routes/User/deletarUserById");

//IMPORTS PESSOA
const cadastroPessoaRouter = require("./routes/Pessoa/cadastroPessoa");
const atualizarPessoaByIdRouter = require("./routes/Pessoa/atualizarPessoaById");
const desativarPessoaByIdRouter = require("./routes/Pessoa/desativarPessoaById");
const consultaPessoaByIdRouter = require("./routes/Pessoa/consultaPessoaById");
const pesquisaGeralPessoasRouter = require("./routes/Pessoa/pesquisaGeralPessoas");
const listarPessoaRouter = require("./routes/Pessoa/listarPessoa");
const imprimirPessoasRouter = require("./routes/Pessoa/imprimirPessoas");
const deletarPessoaByIdRouter = require("./routes/Pessoa/deletarPessoaById");

//IMPORTS LOG
const pesquisarLogsRouter = require("./routes/Log/pesquisarLogs");
const listarLogsRouter = require("./routes/Log/listarLogs");
const imprimirLogsRouter = require("./routes/Log/imprimirLogs");

require("dotenv").config();
app.use(express.json());
app.use(cors());
console.log(moment());

// CONEXÃO **********************************
sequelize.authenticate()
sequelize.sync().then(() => {
    app.listen(port);
    console.log('Servidor rodando na porta ' + port);
});

//ROTA AUTH
app.use("/", loginRouter);

//ROTAS USER
app.use("/", cadastroUserRouter);
app.use("/", pesquisarUserRouter);
app.use("/", listarUserRouter);
app.use("/", imprimirUserRouter);
app.use("/", deletarUserByIdRouter);

//ROTAS PESSOA
app.use("/", consultaPessoaByIdRouter);
app.use("/", cadastroPessoaRouter);
app.use("/", atualizarPessoaByIdRouter);
app.use("/", pesquisaGeralPessoasRouter);
app.use("/", desativarPessoaByIdRouter);
app.use("/", listarPessoaRouter);
app.use("/", imprimirPessoasRouter);
app.use("/", deletarPessoaByIdRouter);

//ROTAS LOG
app.use("/", listarLogsRouter);
app.use("/", imprimirLogsRouter);
app.use("/", pesquisarLogsRouter);

module.exports = app;