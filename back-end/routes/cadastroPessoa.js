const express = require("express"),
  router = express.Router(),
  { cadastrarPessoa } = require("../controllers/cadastroPessoaControl"),
  validateForm = [
    body("nome").notEmpty().withMessage("O nome é obrigatório."),
    body("cpf").notEmpty().withMessage("O CPF é obrigatório."),
    body("tipo").notEmpty().withMessage("O tipo é obrigatório."),
    body("ativo").notEmpty().withMessage("O campo ativo é obrigatório."),
  ];
router.post("/cadastro", validateForm, cadastrarPessoa);
module.exports = router;
