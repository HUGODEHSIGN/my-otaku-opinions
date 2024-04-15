const User = require('./User');
const Anime = require('./Anime');

User.hasMany(Anime, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Anime.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Anime };
