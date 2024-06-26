const router = require('express').Router();
const { Anime, UserAnime } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userId = req.session.user_id;
    console.log('userid: ', userId);
    const malId = req.body.malId;

    const apiRes = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
    const apiData = await apiRes.json();
    const { images, title, synopsis, score } = await apiData.data;

    const [animeData, created] = await Anime.findOrCreate({
      where: { api_id: malId },
      defaults: {
        title,
        synopsis,
        score,
        img_url: images.webp.image_url,
        api_id: malId,
      },
    });
    const anime = animeData.dataValues;

    const userAnime = await UserAnime.findOrCreate({
      where: { anime_id: anime.id, user_id: userId },
      defaults: {
        anime_id: anime.id,
        user_id: userId,
      },
    });
    res.json('Anime successfully followed');
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
