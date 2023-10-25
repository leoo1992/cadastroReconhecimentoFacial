const express = require('express');
const router = express.Router();
const Pessoa = require('../../models/Pessoa');

//rota para deletar por id:
router.delete("/deletar/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pessoaExistente = await Pessoa.findByPk(id);

    if (!pessoaExistente) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }
    await pessoaExistente.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao excluir registro: ", err);
    res.status(500).json({ error: "Erro ao excluir registro." });
  }
});

module.exports = router;