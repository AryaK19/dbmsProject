// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Hackathon = require('./Hackathons');
const Registration = require('./Registration');

const User = sequelize.define('User', {
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
    allowNull: false,
  },
  profile_image: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'users',
  timestamps: false, // Disable timestamps
});

// User.belongsToMany(Hackathon, { through: Registration, foreignKey: 'user_id' });

module.exports = User;