const bcrypt = require('bcrypt');
const Users = require('../models/Users');
const { Op } = require('sequelize');

// Função de controle para o cadastro de usuários
exports.cadastrarUsuario = async (req, res) => {
  const { usuario, senha } = req.body;
  if (!usuario || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const createdUser = await Users.create({
      usuario,
      senha: hashedPassword,
    });

    res.status(200).json({ message: 'Cadastro realizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao inserir os dados: ', err);
    res.status(500).json({ error: 'Erro ao realizar o cadastro.', err });
  }
};

// Função de controle para deletar usuário por ID
exports.deletarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const userExistente = await Users.findByPk(id);

    if (!userExistente) {
      return res.status(404).json({ error: 'Registro não encontrado.' });
    }

    await userExistente.destroy();
    res.status(204).send();
  } catch (err) {
    console.error('Erro ao excluir registro: ', err);
    res.status(500).json({ error: 'Erro ao excluir registro.' });
  }
};

// Função de controle para listar todos os usuários
exports.listarUsuarios = async (req, res) => {
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
    console.error('Erro ao listar os dados: ', err);
    res.status(500).json({ error: 'Erro ao listar os dados.' });
  }
};

// Função de controle para imprimir todos os usuários
exports.imprimirUsuarios = async (req, res) => {
  try {
    const registros = await Users.findAll({
      attributes: ['id', 'usuario'],
    });
    res.status(200).json({
      registros,
    });
  } catch (err) {
    console.error('Erro ao listar os dados: ', err);
    res.status(500).json({ error: 'Erro ao listar os dados.' });
  }
};

// Função de controle para pesquisar usuários
exports.pesquisarUsuarios = async (req, res) => {
  try {
    const { termo } = req.query;

    if (!termo || termo.length < 3) {
      return res.status(200).json({ resultados: [] });
    }

    console.log('Termo de pesquisa:', termo);

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
    console.error('Erro ao realizar pesquisa geral: ', err);
    res.status(500).json({ error: 'Erro ao realizar pesquisa geral.' });
  }
};