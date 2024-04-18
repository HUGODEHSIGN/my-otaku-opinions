const router = require('express').Router();

router.get('/:mal_id', async (req, res) => {
  try {
    const animeId = req.params.mal_id;

    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);

    const detailsData = await response.json();

    const animeDetails = {
      mal_id: detailsData.mal_id,
      title: detailsData.title,
      score: detailsData.score,
      synopsis: detailsData.synopsis,
      image_url: detailsData.images.webp.large_image_url,
      year: detailsData.year,
      genres: [detailsData.genres[0].name, detailsData.genres[1].name],
    };

    console.log(animeDetails);

    res.status(200).render('animeDetails', {
      animeDetails,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
