// models/Hackathons.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hackathon = sequelize.define('Hackathon', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
  organisation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'organisations', 
      key: 'id', 
    },
  },
  participants: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
  },
  admin_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'admin',
      key: 'id',
    },
  },
});

module.exports = Hackathon;