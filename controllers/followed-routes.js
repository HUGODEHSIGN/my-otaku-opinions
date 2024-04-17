const { User, Anime } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const userId = req.session.user_id;
  try {
    const followedData = await User.findByPk(userId, {
      include: [{ model: Anime, as: 'users_anime' }],
    });
    const animeData = followedData.users_anime.map((data) => {
      return {
        mal_id: data.dataValues.api_id,
        title: data.dataValues.title,
        score: data.dataValues.score,
        img_url: data.dataValues.img_url,
      };
    });
    console.log(animeData);
    res.status(200).render('followed', { animeData });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
