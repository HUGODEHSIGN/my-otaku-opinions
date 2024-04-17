// this is to join the table to create a Many to Many relationship
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserAnime extends Model {}

UserAnime.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'useranime',
  }
);
module.exports = UserAnime;
