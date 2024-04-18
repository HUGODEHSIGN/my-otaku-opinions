const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const { username } = req.body;
    const lowercaseUsername = username.toLowerCase();
    // Query the database to check if the username already exists
    const existingUser = await User.findOne({
      where: { username: lowercaseUsername },
    });

    if (existingUser) {
      res.json({ usernameExists: true });
    } else {
      const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json(userData);
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
