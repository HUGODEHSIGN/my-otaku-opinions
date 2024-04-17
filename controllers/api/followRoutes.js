const router = require('express').Router();
const { Anime, UserAnime } = require('../../models');

router.post('/', async (req, res) => {
  const malId = req.body.malId;

  const apiRes = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
  const apiData = await apiRes.json();
  const { images, title, synopsis } = await apiData.data;
  console.log(apiAnime);

  const [anime, created] = await Anime.findOrCreate({
    where: { api_id: malId },
    defaults: {
      title,
      synopsis,
      img_url: images.webp.image_url,
      api_id: malId,
    },
  });
  console.log(req.body);
});

module.exports = router;
