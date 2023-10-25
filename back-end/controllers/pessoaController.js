const { validationResult } = require('express-validator');
const Pessoa = require('../models/Pessoa');
const { Op } = require('sequelize');

// Função de controle para cadastrar uma pessoa
exports.cadastrarPessoa = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nome, cpf, tipo, ativo } = req.body;

  try {
    const createdPessoa = await Pessoa.create({
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
};

// Função de controle para atualizar uma pessoa por ID
exports.atualizarPessoaPorId = async (req, res) => {
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
};

// Função de controle para consultar uma pessoa por ID
exports.consultarPessoaPorId = async (req, res) => {
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
};

// Função de controle para deletar uma pessoa por ID
exports.deletarPessoaPorId = async (req, res) => {
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
};

// Função de controle para desativar uma pessoa por ID
exports.desativarPessoaPorId = async (req, res) => {
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
};

// Função de controle para imprimir todas as pessoas
exports.imprimirPessoas = async (req, res) => {
  try {
    const registros = await Pessoa.findAll();
    res.status(200).json({
      registros,
    });
  } catch (err) {
    console.error("Erro ao listar os dados: ", err);
    res.status(500).json({ error: "Erro ao listar os dados." });
  }
};

// Função de controle para listar todas as pessoas
exports.listarPessoas = async (req, res) => {
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
};

// Função de controle para pesquisar pessoas
exports.pesquisarPessoas = async (req, res) => {
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
};