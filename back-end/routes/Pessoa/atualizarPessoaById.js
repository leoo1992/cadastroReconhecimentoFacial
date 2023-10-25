const express = require('express');
const router = express.Router();
const pessoaController = require("../../controllers/pessoaController");

router.put("/atualizar/:id", pessoaController.atualizarPessoaPorId);

module.exports = router;
