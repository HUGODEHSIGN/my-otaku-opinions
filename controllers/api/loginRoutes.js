const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  const userData = await User.findOne({ where: { email: req.body.email } });

  if (!userData) {
    res
      .status(400)
      .json({ message: 'Incorrect email or password, please try again' });
    return;
  }
});
