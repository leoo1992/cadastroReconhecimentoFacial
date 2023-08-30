/*
const express = require("express");
const router = express.Router();
const Pessoa = require("../models/Pessoa"); // Importe o modelo Pessoa

router.post("/cadastro", async (req, res) => {
  try {
    const formData = {
      nome: req.body.nome,
      cpf: req.body.cpf,
      tipo: req.body.tipo,
      ativo: req.body.ativo,
    };

    const existingUser = await Pessoa.findOne({
      where: {
        cpf: formData.cpf,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "O cpf já está cadastrado." });
    }

    const createdUser = await Pessoa.create({
      nome: formData.nome,
      cpf: formData.cpf,
      tipo: formData.tipo,
      ativo: formData.ativo,
    });

    res.status(200).json({ message: "Cadastro realizado com sucesso." });
  } catch (err) {
    console.error("Erro ao inserir os dados: ", err);
    res.status(500).json({ error: "Erro ao realizar o cadastro." });
  }
});

module.exports = router;
*/
