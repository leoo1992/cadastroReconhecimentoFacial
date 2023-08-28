'use strict';
const fs = require('fs'),
  path = require('path'),
  sequelize = require('sequelize'),
  process = require('process'),
  basename = path.basename(__filename),
  env = process.env.NODE_ENV || 'development',
  config = require(__dirname + '/../config/config.json')[env],
  db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
module.exports = db;
