// models/Comments.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Organisations = sequelize.define('Organisations', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Organisations;