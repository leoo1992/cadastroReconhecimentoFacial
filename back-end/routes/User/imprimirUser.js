const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Rota para imprimir usuários
router.get('/imprimiruser', userController.imprimirUsuarios);

module.exports = router;
