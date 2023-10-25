const express = require('express');
const router = express.Router();
const logController = require("../../controllers/logController");

router.get("/pesquisarlogs", logController.pesquisarLogs);

module.exports = router;
