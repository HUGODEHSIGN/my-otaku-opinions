const router = require('express').Router();
const apiRoutes = require('./api/index.js');
const homeRoutes = require('./home-routes.js');
const followedRoutes = require('./followed-routes.js');
const searchResultRoutes = require('./searchResult-routes.js');
const signupRoutes = require('./signup-routes.js');
const loginRoutes = require('./login-routes.js');

router.use('/', homeRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/followed', followedRoutes);
router.use('/search', searchResultRoutes);
router.use('/api', apiRoutes);

module.exports = router;
