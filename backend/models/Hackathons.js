// models/Hackathon.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
});

module.exports = Hackathon;