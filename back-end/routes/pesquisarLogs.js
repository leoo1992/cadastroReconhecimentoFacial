const express = require('express');
const router = express.Router();
const Log = require("../models/Log");
const { Op } = require('sequelize');
const Pessoa = require('../models/Pessoa');

router.get("/pesquisarlogs", async (req, res) => {
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

module.exports = router;