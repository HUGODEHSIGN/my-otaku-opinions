const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const animeRes = await fetch(
      'https://api.jikan.moe/v4/anime?order_by=score&sort=desc'
    );
    const data = await animeRes.json();
    const animeList = await data.data.slice(0, 10);
    const filteredList = await animeList.map((item, index) => {
      return {
        rank: index + 1,
        mal_id: item.mal_id,
        title: item.title,
        score: item.score,
        synopsis: item.synopsis,
        image_url: item.images.webp.large_image_url,
      };
    });
    console.log(filteredList.length);
    // replace this with res.render when we have views set up
    res
      .status(200)
      .render('homepage', { filteredList, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
