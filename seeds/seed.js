const sequelize = require('../config/connection.js');
const { Anime, User, UserAnime } = require('../models');

const animeData = require('./animeData.json');
const userData = require('./userData.json');

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const anime = await Anime.bulkCreate(animeData);

  process.exit(0);
};

seedDB();
