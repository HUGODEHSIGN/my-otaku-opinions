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

  for (const anime of animeData) {
    await Anime.create(anime);
  }

  for (let i = 0; i < users.length; i++) {
    // Create a new user anime with random user_id
    await UserAnime.create({
      user_id: users[Math.floor(Math.random() * users.length)].id,
    }).catch((err) => {
      console.log(err);
    });
  }

  process.exit(0);
};

seedDB();
