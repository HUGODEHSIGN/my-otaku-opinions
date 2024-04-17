const router = require('express').Router();
const loginRoutes = require('./loginRoutes.js');
const signupRoutes = require('./signupRoutes.js');
const logoutRoutes = require('./logoutRoutes.js');

const followRoutes = require('./followRoutes.js');

router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/logout', logoutRoutes);

router.use('/follow', followRoutes);
module.exports = router;
