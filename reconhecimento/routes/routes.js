const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');
const logController = require('../controllers/logController');

router.get('/obter-nomes', pessoaController.obterNomes);
router.post('/salvar-imagem', pessoaController.salvarImagem);
router.post('/criar-pessoa', pessoaController.criarPessoa);
router.post('/salvar-ou-atualizar-log', logController.salvarOuAtualizarLog);

module.exports = router;
