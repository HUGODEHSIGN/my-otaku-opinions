const router = require('express').Router();
const apiRoutes = require('./api/index.js');
const homeRoutes = require('./home-routes.js');
const followedRoute = require('./followed-routes.js');

router.use('/', homeRoutes);
router.use('/followed', followedRoute);

router.use('/api', apiRoutes);

module.exports = router;
