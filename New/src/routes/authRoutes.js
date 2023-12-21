// authRoutes.js
const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const fitbitRoutes = require('./fitbitRoutes');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

// Include the Fitbit routes under /fitbit
router.use('/fitbit', fitbitRoutes);

module.exports = router;
