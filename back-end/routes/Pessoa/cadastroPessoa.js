const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Pessoa = require('../../models/Pessoa');

// rota para cadastro de pessoas
router.post("/cadastro", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nome, cpf, tipo, ativo } = req.body;

  try {
    const createdUser = await Pessoa.create({
      nome,
      cpf,
      tipo,
      ativo,
    });
    res.status(200).json({ message: "Cadastro realizado com sucesso." });
  } catch (err) {
    console.error("Erro ao inserir os dados: ", err);
    res.status(500).json({ error: "Erro ao realizar o cadastro." });
  }
});

module.exports = router;
