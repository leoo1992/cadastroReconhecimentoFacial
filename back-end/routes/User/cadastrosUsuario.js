const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require("../../models/Users");

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

module.exports = router;
