const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Rota para pesquisar usuários
router.get('/pesquisaruser', userController.pesquisarUsuarios);

module.exports = router;
