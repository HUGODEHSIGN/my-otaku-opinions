const router = require('express').Router();

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
    console.log(apiData);
    res
      .status(200)
      .render('searchResults', { apiData, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
