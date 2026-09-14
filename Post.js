const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// ------------------------------------------------------------------
// Posts model — defined using class + Model.init()
// ------------------------------------------------------------------
class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true,  // adds createdAt and updatedAt
    paranoid: true,    // enables soft-delete (adds deletedAt column)
  }
);

module.exports = Post;