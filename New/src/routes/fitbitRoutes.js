// fitbitRoutes.js
const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const { getFitbitAuthorizationUrl, handleFitbitCallback } = require('../services/fitbitAuthService');

// Fitbit authorization route
router.get('/authorize', (req, res) => {
  const authorizationUrl = getFitbitAuthorizationUrl(req.oidc.accessToken);
  res.redirect(authorizationUrl);
});

// Fitbit callback route
router.get('/callback', requiresAuth(), async (req, res, next) => {
  try {
    const fitbitProfile = await handleFitbitCallback(req);
    res.json({ fitbitProfile });
  } catch (error) {
    next(error);
  }
});

module.exports = router;