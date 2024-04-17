const router = require('express').Router();
const signupRoutes = require('./signupRoutes.js');

router.use('/signup', signupRoutes);

module.exports = router;
