// models/Gallery.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  hackathon_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hackathons',
      key: 'id',
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Gallery;