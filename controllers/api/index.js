const router = require('express').Router();
const loginRoutes = require('./loginRoutes.js');
const signupRoutes = require('./signupRoutes.js');
const logoutRoutes = require('./logoutRoutes.js');

router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/logout', logoutRoutes);
module.exports = router;
