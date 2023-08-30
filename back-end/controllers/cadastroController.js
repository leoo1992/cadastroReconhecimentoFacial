/*
const { validationResult } = require("express-validator");
const Pessoa = require("../models/Pessoa");

const cadastrarPessoa = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
};

module.exports = {
  cadastrarPessoa,
};
*/
