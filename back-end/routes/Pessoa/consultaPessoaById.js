const express = require('express');
const router = express.Router();
const Pessoa = require('../../models/Pessoa');

// rota para buscar uma pessoa pelo id
router.get("/atualizar/:id", async (req, res) => {
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

module.exports = router;