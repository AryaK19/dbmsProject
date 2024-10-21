// models/Hackathons.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Registration = require('./Registration');

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
}, {
  tableName: 'hackathons',
  timestamps: false, // Disable timestamps
});

// Hackathon.belongsToMany(User, { through: Registration, foreignKey: 'hackathon_id' });


module.exports = Hackathon;