// models/Comments.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id', 
    },
  },
  hackathon_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hackathons',
      key: 'id',
    },
  },
});

module.exports = Comment;