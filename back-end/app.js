require("dotenv").config();
const express = require("express");
const sequelize = require("./config/sequelize");
const cors = require("cors");
const Pessoa = require("./models/Pessoa");
const Users = require("./models/Users");
const Log = require("./models/Log");
const Associations = require("./models/associations");
const app = express();
const port = 3000;
const { validationResult } = require("express-validator");
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const moment = require('moment-timezone');

app.use(express.json());
app.use(cors());

console.log(moment());
// CONEXÃO **********************************
sequelize.authenticate()
sequelize.sync().then(() => {
    app.listen(port);
    console.log('Servidor rodando na porta ' + port);
});

//POSTS ROUTERS **********************************
// rota login
app.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
  }

  try {
    const user = await Users.findOne({
      where: {
        usuario,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Erro ao fazer login: ", err);
    res.status(500).json({ error: "Erro ao fazer login." });
  }
});
// rota cadastro usuarios
app.post("/cadastrousuarios", async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const createdUser = await Users.create({
      usuario,
      senha: hashedPassword,
    });

    res.status(200).json({ message: "Cadastro realizado com sucesso." });
  } catch (err) {
    console.error("Erro ao inserir os dados: ", err);
    res.status(500).json({ error: "Erro ao realizar o cadastro.", err });
  }
});
// rota para cadastro
app.post("/cadastro", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nome, cpf, tipo, ativo } = req.body;

  try {
    const createdUser = await Pessoa.create({
      nome,
      cpf,
      tipo,
      ativo,
    });

    res.status(200).json({ message: "Cadastro realizado com sucesso." });
  } catch (err) {
    console.error("Erro ao inserir os dados: ", err);
    res.status(500).json({ error: "Erro ao realizar o cadastro." });
  }
});

//PUTS ROUTERS **********************************
// Rota para atualizar por id
app.put("/atualizar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, tipo, ativo } = req.body;

    const pessoaExistente = await Pessoa.findByPk(id);

    if (!pessoaExistente) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }

    await pessoaExistente.update({ nome, cpf, tipo, ativo });

    res.status(200).json(pessoaExistente);
  } catch (err) {
    console.error("Erro ao atualizar registro: ", err);
    res.status(500).json({ error: "Erro ao atualizar registro." });
  }
});
// rota para desativar por id
app.put("/desativar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { ativo } = req.body;

    const pessoaExistente = await Pessoa.findByPk(id);

    if (!pessoaExistente) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }

    await pessoaExistente.update({ ativo });

    res.status(200).json(pessoaExistente);
  } catch (err) {
    console.error("Erro ao atualizar registro: ", err);
    res.status(500).json({ error: "Erro ao atualizar registro." });
  }
});

//GETS ROUTERS **********************************
// rota para buscar uma pessoa pelo id
app.get("/atualizar/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pessoaExistente = await Pessoa.findByPk(id);

    if (!pessoaExistente) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }

    res.status(200).json(pessoaExistente);
  } catch (err) {
    console.error("Erro ao buscar registro pelo id: ", err);
    res.status(500).json({ error: "Erro ao buscar registro pelo id." });
  }
});
// rota para pesquisa geral
app.get("/pesquisar", async (req, res) => {
  try {
    const { termo } = req.query;

    if (!termo || termo.length < 3) {
      return res.status(200).json({ resultados: [] });
    }

    console.log("Termo de pesquisa:", termo);

    const resultados = await Pessoa.findAll({
      where: {
        [Op.or]: [
          { nome: { [Op.like]: `%${termo}%` } },
          { cpf: { [Op.like]: `%${termo}%` } },
          { id: { [Op.eq]: termo } },
        ],
      },
    });

    res.status(200).json({ resultados });
  } catch (err) {
    console.error("Erro ao realizar pesquisa geral: ", err);
    res.status(500).json({ error: "Erro ao realizar pesquisa geral." });
  }
});
// rota Listar
app.get("/listar", async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina) || 1;
    const limitePorPagina = parseInt(req.query.limitePorPagina) || 10;
    const showInactive = req.query.showInactive === 'true' || false;
    const searchQuery = req.query.search || '';
    let whereClause = showInactive ? {} : { ativo: 1 };
    const totalRegistros = await Pessoa.count({ where: whereClause });
    const paginacao = (pagina - 1) * limitePorPagina;
    const numeroDePaginas = Math.ceil(totalRegistros / limitePorPagina) || 1;

    if (searchQuery) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { nome: { [Op.like]: `%${searchQuery}%` } },
          { cpf: { [Op.like]: `%${searchQuery}%` } },
          { id: { [Op.eq]: searchQuery } },
        ],
      };
    }

    const registros = await Pessoa.findAll({
      where: whereClause,
      limit: limitePorPagina,
      offset: paginacao,
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
app.get("/imprimir", async (req, res) => {
  try {
    const registros = await Pessoa.findAll();
    res.status(200).json({
      registros,
    });
  } catch (err) {
    console.error("Erro ao listar os dados: ", err);
    res.status(500).json({ error: "Erro ao listar os dados." });
  }
});
// rota pesquisar usuario
app.get("/pesquisaruser", async (req, res) => {
  try {
    const { termo } = req.query;

    if (!termo || termo.length < 3) {
      return res.status(200).json({ resultados: [] });
    }

    console.log("Termo de pesquisa:", termo);

    const resultados = await Users.findAll({
      where: {
        [Op.or]: [
          { usuario: { [Op.like]: `%${termo}%` } },
          { id: { [Op.eq]: termo } },
        ],
      },
    });

    res.status(200).json({ resultados });
  } catch (err) {
    console.error("Erro ao realizar pesquisa geral: ", err);
    res.status(500).json({ error: "Erro ao realizar pesquisa geral." });
  }
});
// rota listar usuario
app.get("/listaruser", async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina) || 1;
    const limitePorPagina = parseInt(req.query.limitePorPagina) || 10;
    const searchQuery = req.query.search || '';

    let whereClause = {};

    if (searchQuery) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { usuario: { [Op.like]: `%${searchQuery}%` } },
          { id: { [Op.eq]: searchQuery } },
        ],
      };
    }

    const totalRegistros = await Users.count({ where: whereClause });

    const paginacao = (pagina - 1) * limitePorPagina;
    const numeroDePaginas = Math.ceil(totalRegistros / limitePorPagina) || 1;

    const registros = await Users.findAll({
      where: whereClause,
      limit: limitePorPagina,
      offset: paginacao,
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

//DELETES ROUTERS **********************************
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