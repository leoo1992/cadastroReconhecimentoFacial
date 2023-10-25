const express = require('express');
const router = express.Router();
const pessoaController = require("../../controllers/pessoaController");

router.put("/desativar/:id", pessoaController.desativarPessoaPorId);

module.exports = router;
