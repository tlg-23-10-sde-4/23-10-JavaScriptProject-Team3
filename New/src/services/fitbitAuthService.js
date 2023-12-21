// fitbitAuthService.js
const axios = require('axios');

const FITBIT_API_BASE_URL = 'https://api.fitbit.com';
const FITBIT_OAUTH_URL = 'https://www.fitbit.com/oauth2/authorize';
const FITBIT_TOKEN_URL = 'https://api.fitbit.com/oauth2/token';

// Function to get the Fitbit authorization URL
function getFitbitAuthorizationUrl(clientId, redirectUri, scope) {
  const authorizationUrl = `${FITBIT_OAUTH_URL}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  return authorizationUrl;
}

// Function to handle the Fitbit callback and fetch profile data
async function handleFitbitCallback(clientId, clientSecret, redirectUri, req) {
  try {
    // Extract the authorization code from the request query
    const authorizationCode = req.query.code;

    // Exchange the authorization code for an access token
    const accessToken = await exchangeAuthorizationCodeForToken(clientId, clientSecret, redirectUri, authorizationCode);

    // Use the access token to fetch the Fitbit profile data
    const fitbitProfile = await getFitbitProfile(accessToken);

    return fitbitProfile;
  } catch (error) {
    console.error('Error handling Fitbit callback:', error);
    throw error;
  }
}

// Function to exchange the authorization code for an access token
async function exchangeAuthorizationCodeForToken(clientId, clientSecret, redirectUri, authorizationCode) {
  const tokenResponse = await axios.post(FITBIT_TOKEN_URL, null, {
    params: {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: authorizationCode,
      grant_type: 'authorization_code',
    },
  });

  return tokenResponse.data.access_token;
}

// Function to get the Fitbit profile data
async function getFitbitProfile(accessToken) {
  try {
    const response = await axios.get(`${FITBIT_API_BASE_URL}/1/user/-/profile.json`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching Fitbit profile data:', error);
    throw error;
  }
}

module.exports = { getFitbitAuthorizationUrl, handleFitbitCallback };
