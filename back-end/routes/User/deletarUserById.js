const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Rota para deletar usuário por ID
router.delete('/deletaruser/:id', userController.deletarUsuarioPorId);

module.exports = router;
