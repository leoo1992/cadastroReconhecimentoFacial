const express = require('express');
const router = express.Router();
const logController = require("../../controllers/logController");

router.get("/imprimirlogs", logController.imprimirLogs);

module.exports = router;
