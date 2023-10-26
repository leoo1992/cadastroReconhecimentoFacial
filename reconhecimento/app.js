require("dotenv").config();
const express = require('express');
const sequelize = require("./config/sequelize");
const cors = require('cors');
const app = express();
const moment = require('moment-timezone');
const port = 3002;
const initController = require('./controllers/initController');
const router = require('./routes/routes');

console.log(moment());

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// CONEXÃO **********************************
sequelize.authenticate()
sequelize.sync().then(() => {
    app.listen(port);
    console.log('Servidor rodando na porta ' + port);
});

// Inicializa as configurações do aplicativo
initController.initApp(app);

//ROTAS
app.use(router);

module.exports = app;
