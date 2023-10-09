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
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
      get() {
        const rawDate = this.getDataValue('data');
        const adjustedDate = moment(rawDate).add(3, 'hours');
        return adjustedDate.format('DD-MM-YYYY HH:mm:ss');
      },
      set(value) {
        const formattedDate = moment(value, 'DD-MM-YYYY HH:mm:ss', true);
        if (formattedDate.isValid()) {
          this.setDataValue('data', formattedDate.format('YYYY-MM-DD HH:mm:ss'));
        } else {
          throw new Error('Invalid date format');
        }
      },
    },
  }, {
    tableName: "Log"
  });

  module.exports = Log;

