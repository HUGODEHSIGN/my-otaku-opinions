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

  for (let i = 0; i < anime.length; i++) {
    // Create a new user anime with random user_id and api_id values
    await UserAnime.create({
      user_id: users[Math.floor(Math.random() * users.length)].id,
      api_id: Math.floor(Math.random() * anime.length),
    }).catch((err) => {
      console.log(err);
    });
  }

  process.exit(0);
};

seedDB();
