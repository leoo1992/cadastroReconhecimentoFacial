const Log = require('../models/Log');
const Pessoa = require('../models/Pessoa');
const { Op } = require('sequelize');

// Função de controle para imprimir logs
exports.imprimirLogs = async (req, res) => {
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
    console.error('Erro ao listar os dados: ', err);
    res.status(500).json({ error: 'Erro ao listar os dados.' });
  }
};

// Função de controle para listar logs
exports.listarLogs = async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina) || 1;
    const limitePorPagina = parseInt(req.query.limitePorPagina) || 10;
    const searchQuery = req.query.search || '';
    let whereClause = {};
    const totalRegistros = await Log.count({ where: whereClause });
    const paginacao = (pagina - 1) * limitePorPagina;
    const numeroDePaginas = Math.ceil(totalRegistros / limitePorPagina) || 1;

    if (searchQuery) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { id: { [Op.like]: `%${searchQuery}%` } },
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
    console.error('Erro ao listar os dados: ', err);
    res.status(500).json({ error: 'Erro ao listar os dados.' });
  }
};

// Função de controle para pesquisar logs
exports.pesquisarLogs = async (req, res) => {
  try {
    const { termo } = req.query;

    if (!termo || termo.length < 3) {
      return res.status(200).json({ resultados: [] });
    }

    console.log('Termo de pesquisa:', termo);

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
    console.error('Erro ao realizar pesquisa geral: ', err);
    res.status(500).json({ error: 'Erro ao realizar pesquisa geral.' });
  }
};
