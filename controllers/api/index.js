const router = require('express').Router();
const loginRoutes = require('./loginRoutes.js');
const logoutRoutes = require('./logoutRoutes.js');

router.use('/login', loginRoutes);

module.exports = router;
