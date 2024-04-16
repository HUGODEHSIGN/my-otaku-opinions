const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Anime extends Model {}

Anime.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    data_added: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    api_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'anime',
  }
);
// i took out the user_id since it would only be for one user
// many to many relationship for the user; so that anime can have many users through their joint useranime.js connection file
Anime.belongsToMany(User, { through: 'UserAnime' });

module.exports = Anime;
