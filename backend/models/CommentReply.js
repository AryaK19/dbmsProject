const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CommentReply = sequelize.define('CommentReply', {
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  reply: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'comments_reply',
  timestamps: false, // Ensure timestamps are enabled
});

module.exports = CommentReply;