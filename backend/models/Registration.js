const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Registration = sequelize.define('Registration', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    primaryKey: true,
  },
  hackathon_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hackathons',
      key: 'id',
    },
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Registration;