const sequelize = require('../config/connection.js');
const { Anime, User } = require('../models');

const animeData = require('./animeData.json');
const userData = require('./userData.json');

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const anime of animeData) {
    await Anime.create({
      ...anime,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      api_id: Math.floor(Math.random() * 1000),
    });
  }
  process.exit(0);
};

seedDB();
