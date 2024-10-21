// models/CommentsReply.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CommentsReply = sequelize.define('CommentsReply', {
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'comments', 
      key: 'id',
    },
  },
  reply: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = CommentsReply;