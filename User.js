const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // Built-in validation: ensures a valid email format
        isEmail: {
          msg: 'Please provide a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Custom validation method: password must be longer than 6 characters
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error('Password must be greater than 6 characters long');
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    tableName: 'users',
    timestamps: true, // adds createdAt and updatedAt automatically
    hooks: {
      // Custom validation method added to a beforeCreate hook:
      // ensures the user's name is greater than 2 characters
      beforeCreate: (user) => {
        checkNameLength(user);
      },
    },
  }
);

// Custom validation function used inside the beforeCreate hook
function checkNameLength(user) {
  if (!user.name || user.name.length <= 2) {
    throw new Error('Name must be greater than 2 characters long');
  }
}

module.exports = User;