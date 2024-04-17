const router = require('express').Router();
const loginRoutes = require('./loginRoutes.js');
const logoutRoutes = require('./logoutRoutes.js');
const signupRoutes = require('./signupRoutes.js');

router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);

module.exports = router;
