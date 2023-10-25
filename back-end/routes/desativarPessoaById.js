const express = require('express');
const router = express.Router();
const Pessoa = require('../models/Pessoa');

// rota para desativar pessoa por id
router.put("/desativar/:id", async (req, res) => {
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
});

module.exports = router;
