// models/Hackathon.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Registration = require('./Registration');

const Hackathon = sequelize.define('Hackathon', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image_url: {
    type: DataTypes.STRING,
  },
  organization: {
    type: DataTypes.STRING,
  },
  participants: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
  },
  time: {
    type: DataTypes.STRING,
  },
  contact_email: {
    type: DataTypes.STRING,
  },
  contact_phone: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'hackathons',
  timestamps: false, // Disable timestamps
});

// Hackathon.belongsToMany(User, { through: Registration, foreignKey: 'hackathon_id' });


module.exports = Hackathon;