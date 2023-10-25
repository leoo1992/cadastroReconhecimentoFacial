const express = require('express');
const router = express.Router();
const pessoaController = require("../../controllers/pessoaController");

router.delete("/deletar/:id", pessoaController.deletarPessoaPorId);

module.exports = router;
