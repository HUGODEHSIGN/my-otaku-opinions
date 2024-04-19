const { Anime, UserAnime } = require('../models');

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
  try {
    const animeRes = await fetch(
      'https://api.jikan.moe/v4/anime?order_by=score&sort=desc'
    );
    const data = await animeRes.json();
    const animeList = await data.data.slice(0, 10);

    const filteredList = await Promise.all(
      animeList.map(async (item, index) => {
        const isFollowed = await getIsFollowed(item.mal_id, req);

        return {
          rank: index + 1,
          mal_id: item.mal_id,
          title: item.title,
          score: item.score,
          synopsis: item.synopsis,
          image_url: item.images.webp.large_image_url,
          isFollowed,
        };
      })
    );
    console.log(await filteredList);

    // replace this with res.render when we have views set up
    res
      .status(200)
      .render('homepage', { filteredList, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
