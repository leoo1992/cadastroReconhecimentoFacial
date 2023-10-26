const express = require('express');
const router = express.Router();
const logController = require('../../controllers/logController');

// Rota para contar quantas pessoas fizeram log hoje
router.get('/logs-hoje', logController.countLogshoje);

module.exports = router;
