const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Hackathon = require('./Hackathons');

const Registration = sequelize.define('Registration', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  hackathon_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Hackathon,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'registrations',
  timestamps: false,
});

// User.belongsToMany(Hackathon, { through: Registration, foreignKey: 'user_id' });
// Hackathon.belongsToMany(User, { through: Registration, foreignKey: 'hackathon_id' });
// User.
module.exports = Registration;