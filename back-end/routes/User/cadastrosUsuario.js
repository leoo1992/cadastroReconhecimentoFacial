const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Rota para cadastro de usuários
router.post('/cadastrousuarios', userController.cadastrarUsuario);

module.exports = router;
