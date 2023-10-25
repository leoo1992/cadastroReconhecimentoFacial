const express = require('express');
const router = express.Router();
const pessoaController = require("../../controllers/pessoaController");

router.get("/atualizar/:id", pessoaController.consultarPessoaPorId);

module.exports = router;
