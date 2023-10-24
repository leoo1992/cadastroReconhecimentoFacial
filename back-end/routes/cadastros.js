const express = require('express'),
  router = express.Router(),
  { validationResult } = require('express-validator'),
  Pessoa = require('../models/Pessoa'),
  Users = require("../models/Users"),
  bcrypt = require('bcrypt');

// rota cadastro usuarios
router.post("/cadastrousuarios", async (req, res) => {
  const { usuario, senha } = req.body;
  if (!usuario || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const createdUser = await Users.create({
      usuario,
      senha: hashedPassword,
    });

    res.status(200).json({ message: "Cadastro realizado com sucesso." });
  } catch (err) {
    console.error("Erro ao inserir os dados: ", err);
    res.status(500).json({ error: "Erro ao realizar o cadastro.", err });
  }
});
// rota para cadastro
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
