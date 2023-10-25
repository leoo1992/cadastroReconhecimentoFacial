const express = require('express');
const router = express.Router();
const Users = require("../models/Users");

// rota deletar usuario por id
router.delete("/deletaruser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const UserExistente = await Users.findByPk(id);

    if (!UserExistente) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }
    await UserExistente.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao excluir registro: ", err);
    res.status(500).json({ error: "Erro ao excluir registro." });
  }
});

module.exports = router;