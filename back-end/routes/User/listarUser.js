const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Rota para listar usuários
router.get('/listaruser', userController.listarUsuarios);

module.exports = router;
