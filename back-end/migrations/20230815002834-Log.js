"use strict";
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Log", {
        id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        data: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      });
  },

  down: async (queryInterface, Sequelize) => {
    console.log("INITIALIZE UNDO: Log");
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryInterface.dropTable("Log");
    console.log("COMPLETE UNDO: Log");
  },
};
