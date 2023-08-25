const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carregar variáveis de ambiente do .env

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

module.exports = sequelize;
