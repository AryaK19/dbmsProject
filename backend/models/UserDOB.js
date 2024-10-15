// models/User_DOB.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserDOB = sequelize.define('UserDOB', {
  DOB: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = UserDOB;