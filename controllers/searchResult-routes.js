const { UserAnime, Anime } = require('../models');

const router = require('express').Router();

async function getIsFollowed(mal_id, req) {
  if (!req.session.logged_in) {
    return false;
  }

  const dbAnime = await Anime.findOne({
    where: {
      api_id: mal_id,
    },
  });
  console.log('dbAnime', dbAnime);
  if (!dbAnime) {
    return false;
  }

  const dbAnimeId = await dbAnime.dataValues.id;

  const userAnime = await UserAnime.findOne({
    where: {
      anime_id: dbAnimeId,
      user_id: req.session.user_id,
    },
  });

  if (!userAnime) {
    return false;
  }

  return true;
}

router.get('/', async (req, res) => {
  console.log(req.query.q);
  try {
    // this url only gets the top 25 results, change later if we want pagination
    const queryParams = req.query.q;
    const result = await fetch(
      `https://api.jikan.moe/v4/anime?q=${queryParams}&order_by=score&sort=desc`
    );
    const apiData = await result.json();
    apiData.data = await apiData.data.filter(
      (data) =>
        data.rating &&
        data.score &&
        data.scored_by &&
        data.rank &&
        data.popularity &&
        data.members &&
        data.favorites
    );
    apiData.data = await Promise.all(
      apiData.data.map(async (data) => {
        const isFollowed = await getIsFollowed(data.mal_id, req);
        return {
          mal_id: data.mal_id,
          title: data.title,
          score: data.score,
          img_url: data.images.webp.large_image_url,
          isFollowed,
        };
      })
    );
    console.log(apiData);
    res
      .status(200)
      .render('searchResults', { apiData, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
