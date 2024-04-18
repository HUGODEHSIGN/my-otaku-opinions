const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const queryParams = req.query.q;

    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${queryParams}&order_by=score&sort=desc`
    );

    const detailsData = await response.json();

    const animeDetails = await animeList.map((data) => {
      return {
        mal_id: data.mal_id,
        title: data.title,
        score: data.score,
        synopsis: data.synopsis,
        image_url: data.images.webp.large_image_url,
        year: data.year,
        genres: [data.genres[0].name, data.genres[1].name],
      };
    });
    console.log(animeDetails);

    res.status(200).render('anime-details', {
      animeDetails,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
