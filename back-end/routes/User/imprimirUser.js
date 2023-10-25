const express = require('express');
const router = express.Router();
const Users = require("../../models/Users");

router.get("/imprimiruser", async (req, res) => {
  try {
    const registros = await Users.findAll({
      attributes: ['id', 'usuario'],
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