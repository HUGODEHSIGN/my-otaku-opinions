const User = require('./User');
const Anime = require('./Anime');
const UserAnime = require('./UserAnime');

User.belongsToMany(Anime, {
  through: {
    model: UserAnime,
    unique: false,
  },
  as: 'users_anime',
});

Anime.belongsToMany(User, {
  through: {
    model: UserAnime,
    unique: false,
  },
  //Alias name for when data is retrieved
  as: 'anime_list_for_each_user',
});

module.exports = { User, UserAnime, Anime };
