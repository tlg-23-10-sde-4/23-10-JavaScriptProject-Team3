const axios = require('axios');
const FITBIT_API_BASE_URL = 'https://api.fitbit.com';
const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjdHNUwiLCJzdWIiOiI0R0M5Q0siLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3YWN0IiwiZXhwIjoxNzAzMjQyNjY2LCJpYXQiOjE3MDMxNTYyNjZ9.pL3BDsZ1Guchc2qUG4Tk74b_fYYgeqLsTFuOU3K7KRY" 
const today = new Date();
const sevenDaysAgo = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()-7}`;
const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

async function getUserProfile(accessToken) {
  try {
    const response = await axios.get(`${FITBIT_API_BASE_URL}/1/user/-/profile.json`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile data:', error);
    throw error;
  }
}

async function getBMIForWeek(accessToken) {
  console.log('accessToken', accessToken);
  try {
    const response = await axios.get(`${FITBIT_API_BASE_URL}/1/user/-/body/bmi/date/today/7d.json`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching body composition data:', error);
    throw error;
  }
}
async function getWeightData(accessToken) {
  console.log('accessToken', accessToken);
  try {
    const response = await axios.get(`${FITBIT_API_BASE_URL}/1/user/-/body/weight/date/today/7d.json`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching body composition data:', error);
    throw error;
  }
}

async function getNutritionData(accessToken) {
  try {
    const response = await axios.get(`${FITBIT_API_BASE_URL}/1/user/-/foods/log/date/${todayString}.json`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    throw error;
  }
}

async function getActivitiesData(accessToken) {
  try {
    const response = await axios.get(`${FITBIT_API_BASE_URL}/1/user/-/activities.json`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching activities data:', error);
    throw error;
  }
}

async function getSleepData(accessToken) {
  try {
    const response = await axios.get(`${FITBIT_API_BASE_URL}/1.2/user/-/sleep/list.json`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sleep data:', error);
    throw error;
  }
}

module.exports = { getUserProfile, getWeightData, getBMIForWeek , getNutritionData, getActivitiesData, getSleepData };
