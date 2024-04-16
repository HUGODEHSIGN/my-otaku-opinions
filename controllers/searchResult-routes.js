const router = require('express').Router();

router.get('/', async (req, res) => {
  console.log(req.query.q);
  try {
    // this url only gets the top 25 results, change later if we want pagination
    const queryParams = req.query.q;
    const result = await fetch(
      `https://api.jikan.moe/v4/anime?q=${queryParams}&order_by=popularity&sort=asc`
    );
    const apiData = await result.json();
    console.log(apiData);
    res.status(200).render('searchResults', { apiData });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
