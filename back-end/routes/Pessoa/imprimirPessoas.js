const express = require('express');
const router = express.Router();
const Pessoa = require('../../models/Pessoa');

router.get("/imprimir", async (req, res) => {
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

module.exports = router;