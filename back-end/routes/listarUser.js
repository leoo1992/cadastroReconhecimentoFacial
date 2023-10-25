const express = require('express');
const router = express.Router();
const Users = require("../models/Users");
const { Op } = require('sequelize');

// rota listar usuario
router.get("/listaruser", async (req, res) => {
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

module.exports = router;