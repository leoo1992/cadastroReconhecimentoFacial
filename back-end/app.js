const express = require("express");
const sequelize = require("./config/sequelize");
const cors = require("cors");
const Pessoa = require("./models/Pessoa");
const Users = require("./models/Users");
const Log = require("./models/Log");
const Associations = require("./models/associations");
const app = express();
const port = 3000;
const { Op } = require('sequelize');
const moment = require('moment-timezone');

//IMPORTS USER
const loginRouter = require("./routes/login");
const cadastroUserRouter = require("./routes/cadastrosUsuario");
const pesquisarUserRouter = require("./routes/pesquisarUser");
const listarUserRouter = require("./routes/listarUser");
const imprimirUserRouter = require("./routes/imprimirUser");

//IMPORTS PESSOA
const cadastroPessoaRouter = require("./routes/cadastroPessoa");
const atualizarPessoaByIdRouter = require("./routes/atualizarPessoaById");
const desativarPessoaByIdRouter = require("./routes/desativarPessoaById");
const consultaPessoaByIdRouter = require("./routes/consultaPessoaById");
const pesquisaGeralPessoasRouter = require("./routes/pesquisaGeralPessoas");
const listarPessoaRouter = require("./routes/listarPessoa");
const imprimirPessoasRouter = require("./routes/imprimirPessoas");

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

//ROTAS PESSOA
app.use("/", consultaPessoaByIdRouter);
app.use("/", cadastroPessoaRouter);
app.use("/", atualizarPessoaByIdRouter);
app.use("/", pesquisaGeralPessoasRouter);
app.use("/", desativarPessoaByIdRouter);
app.use("/", listarPessoaRouter);
app.use("/", imprimirPessoasRouter);

app.get("/imprimiruser", async (req, res) => {
  try {
    const registros = await Users.findAll({
      attributes: ['id', 'usuario'],
    });
    res.status(200).json({
      registros,
    });
  } catch (err) {
    console.error("Erro ao listar os dados: ", err);
    res.status(500).json({ error: "Erro ao listar os dados." });
  }
});

// rota listar Logs
app.get("/listarlogs", async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina) || 1;
    const limitePorPagina = parseInt(req.query.limitePorPagina) || 10;
    const searchQuery = req.query.search || '';
    let whereClause ={};
    const totalRegistros = await Log.count({ where: whereClause });
    const paginacao = (pagina - 1) * limitePorPagina;
    const numeroDePaginas = Math.ceil(totalRegistros / limitePorPagina) || 1;

    if (searchQuery) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { 'id': { [Op.like]: `%${searchQuery}%` } },
        ],
      };
    }
    const registros = await Log.findAll({
      where: whereClause,
      limit: limitePorPagina,
      offset: paginacao,
      include: [
        {
          model: Pessoa,
        },
      ],
    });
    res.status(200).json({
      registros,
      numerodepaginas: numeroDePaginas,
      totalregistros: totalRegistros,
    });
  } catch (err) {
    console.error("Erro ao listar os dados: ", err);
    res.status(500).json({ error: "Erro ao listar os dados." });
  }
});

app.get("/imprimirlogs", async (req, res) => {
  try {
    const registros = await Log.findAll({
      include: [
        {
          model: Pessoa,
        },
      ],
    });
    res.status(200).json({
      registros,
    });
  } catch (err) {
    console.error("Erro ao listar os dados: ", err);
    res.status(500).json({ error: "Erro ao listar os dados." });
  }
});

app.get("/pesquisarlogs", async (req, res) => {
  try {
    const { termo } = req.query;

    if (!termo || termo.length < 3) {
      return res.status(200).json({ resultados: [] });
    }

    console.log("Termo de pesquisa:", termo);

    const registros = await Log.findAll({
      where: {
        [Op.or]: [
          { '$Pessoas.nome$': { [Op.like]: `%${termo}%` } },
        ],
      },
      include: [
        {
          model: Pessoa,
          as: 'Pessoas',
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).json({ registros });
  } catch (err) {
    console.error("Erro ao realizar pesquisa geral: ", err);
    res.status(500).json({ error: "Erro ao realizar pesquisa geral." });
  }
});

//rota para deletar por id:
app.delete("/deletar/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pessoaExistente = await Pessoa.findByPk(id);

    if (!pessoaExistente) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }
    await pessoaExistente.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao excluir registro: ", err);
    res.status(500).json({ error: "Erro ao excluir registro." });
  }
});

// rota deletar usuario por id
app.delete("/deletaruser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const UserExistente = await Users.findByPk(id);

    if (!UserExistente) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }
    await UserExistente.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao excluir registro: ", err);
    res.status(500).json({ error: "Erro ao excluir registro." });
  }
});

module.exports = app;