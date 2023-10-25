const express = require('express');
const router = express.Router();
const Log = require("../models/Log");
const Pessoa = require('../models/Pessoa');

router.get("/imprimirlogs", async (req, res) => {
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

module.exports = router;