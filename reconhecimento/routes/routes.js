const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');
const logController = require('../controllers/logController');
const initController = require('../controllers/initController');

router.get('/obter-nomes', initController.obterNomes);
router.post('/salvar-imagem', pessoaController.salvarImagem);
router.post('/criar-pessoa', pessoaController.criarPessoa);
router.post('/salvar-ou-atualizar-log', logController.salvarOuAtualizarLog);

module.exports = router;
