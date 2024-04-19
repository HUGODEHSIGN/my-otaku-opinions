const { User, Anime, UserAnime } = require('../models');
const router = require('express').Router();

router.get('/:mal_id', async (req, res) => {
  try {
    const animeId = req.params.mal_id;

    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);

    const detailsData = await response.json();

    async function getIsFollowed() {
      if (!req.session.logged_in) {
        return false;
      }
      const dbAnime = await Anime.findOne({
        where: {
          api_id: animeId,
        },
      });

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

    const isFollowed = await getIsFollowed();

    const data = detailsData.data;

    const animeDetails = {
      mal_id: data.mal_id,
      title: data.title,
      englishTitle: data.title_english,
      score: data.score,
      synopsis: data.synopsis,
      image_url: data.images.webp.large_image_url,
      year: data.year,
      genres: data.genres.map((genre) => genre.name),
      isFollowed,
    };

    res.status(200).render('animeDetails', {
      animeDetails,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
