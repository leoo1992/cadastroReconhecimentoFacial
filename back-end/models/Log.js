"use strict";
const { DataTypes } = require('sequelize'),
  sequelize = require('../config/sequelize');

const Log = sequelize.define("Log", {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW,
  },
}, {
  tableName: "Log"
});

module.exports = Log;
