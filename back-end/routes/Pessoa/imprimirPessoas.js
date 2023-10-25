const express = require('express');
const router = express.Router();
const pessoaController = require("../../controllers/pessoaController");

router.get("/imprimir", pessoaController.imprimirPessoas);

module.exports = router;
