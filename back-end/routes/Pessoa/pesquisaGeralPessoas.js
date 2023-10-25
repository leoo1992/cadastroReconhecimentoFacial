const express = require('express');
const router = express.Router();
const pessoaController = require("../../controllers/pessoaController");

router.get("/pesquisar", pessoaController.pesquisarPessoas);

module.exports = router;
