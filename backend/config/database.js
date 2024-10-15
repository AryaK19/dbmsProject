// backend/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hackathon_db', 'root', 'Jyotikadam@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;