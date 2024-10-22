// models/Admin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admins = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Admins;