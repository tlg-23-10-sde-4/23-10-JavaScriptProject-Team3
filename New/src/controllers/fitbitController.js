const fitbitService = require('../services/fitbitService');

// Common error handling function
const handleServiceError = (res, error, message) => {
  console.error(message, error);
  res.status(500).send('Internal Server Error');
};

const fitbitController = {
  getProfile: async (req, res) => {
    try {
      const accessToken = req.session.accessToken;
      const userProfile = await fitbitService.getUserProfile(accessToken);
      res.render('profile', { userProfile });
    } catch (error) {
      handleServiceError(res, error, 'Error fetching profile:');
    }
  },

  getBodyComposition: async (req, res) => {
    try {
      const accessToken = req.session.accessToken;
      const bodyCompData = await fitbitService.getBodyComposition(accessToken);
      res.render('bodycomp', { bodyCompData });
    } catch (error) {
      handleServiceError(res, error, 'Error fetching body composition data:');
    }
  },

  getActivities: async (req, res) => {
    try {
      const accessToken = req.session.accessToken;
      const activitiesData = await fitbitService.getActivitiesData(accessToken);
      res.render('activities', { activitiesData });
    } catch (error) {
      handleServiceError(res, error, 'Error fetching activities data:');
    }
  },

  getNutrition: async (req, res) => {
    try {
      const accessToken = req.session.accessToken;
      const nutritionData = await fitbitService.getNutritionData(accessToken);
      res.render('nutrition', { nutritionData });
    } catch (error) {
      handleServiceError(res, error, 'Error fetching nutrition data:');
    }
  },

  getSleep: async (req, res) => {
    try {
      const accessToken = req.session.accessToken;
      const sleepData = await fitbitService.getSleepData(accessToken);
      res.render('sleep', { sleepData });
    } catch (error) {
      handleServiceError(res, error, 'Error fetching sleep data:');
    }
  },
};

module.exports = fitbitController;
