const express = require('express');
const router = express.Router();
const Pessoa = require('../models/Pessoa');
const { Op } = require('sequelize');

router.get("/listar", async (req, res) => {
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

module.exports = router;