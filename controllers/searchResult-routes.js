const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    // this url only gets the top 25 results, change later if we want pagination
    const result = await fetch(
      'https://api.jikan.moe/v4/anime?q=naruto&order_by=popularity&sort=asc'
    );
    const apiData = await result.json();
    console.log(animeArray);
    res.status(200).render('searchResults', { apiData });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
