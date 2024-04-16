// this is to join the table to create a Many to Many relationship
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserAnime extends Model {}

UserAnime.init(
    {
        
    })
