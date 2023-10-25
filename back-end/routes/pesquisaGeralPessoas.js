const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Pessoa = require('../models/Pessoa');

// rota para pesquisa geral no modelo Pessoas
router.get("/pesquisar", async (req, res) => {
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

module.exports = router;