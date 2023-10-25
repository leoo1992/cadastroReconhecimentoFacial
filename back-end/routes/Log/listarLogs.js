const express = require('express');
const router = express.Router();
const logController = require("../../controllers/logController");

router.get("/listarlogs", logController.listarLogs);

module.exports = router;
