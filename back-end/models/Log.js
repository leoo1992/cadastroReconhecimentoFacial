"use strict";
const { DataTypes } = require('sequelize'),
  sequelize = require('../config/sequelize');
  const moment = require('moment-timezone');

  const Log = sequelize.define("Log", {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
      timestamps: true,
    },
  }, {
    tableName: "Log",
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  });

  module.exports = Log;

