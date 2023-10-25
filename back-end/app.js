const express = require("express");
const sequelize = require("./config/sequelize");
const cors = require("cors");
const Associations = require("./models/associations");
const app = express();
const port = 3000;
const moment = require('moment-timezone');

//IMPORTS USER
const loginRouter = require("./routes/login");
const cadastroUserRouter = require("./routes/cadastrosUsuario");
const pesquisarUserRouter = require("./routes/pesquisarUser");
const listarUserRouter = require("./routes/listarUser");
const imprimirUserRouter = require("./routes/imprimirUser");
const deletarUserByIdRouter = require("./routes/deletarUserById");

//IMPORTS PESSOA
const cadastroPessoaRouter = require("./routes/cadastroPessoa");
const atualizarPessoaByIdRouter = require("./routes/atualizarPessoaById");
const desativarPessoaByIdRouter = require("./routes/desativarPessoaById");
const consultaPessoaByIdRouter = require("./routes/consultaPessoaById");
const pesquisaGeralPessoasRouter = require("./routes/pesquisaGeralPessoas");
const listarPessoaRouter = require("./routes/listarPessoa");
const imprimirPessoasRouter = require("./routes/imprimirPessoas");
const deletarPessoaByIdRouter = require("./routes/deletarPessoaById");

//IMPORTS LOG
const pesquisarLogsRouter = require("./routes/pesquisarLogs");
const listarLogsRouter = require("./routes/listarLogs");
const imprimirLogsRouter = require("./routes/imprimirLogs");

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

//ROTAS USER
app.use("/", loginRouter);
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