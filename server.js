const express = require('express');
const session = require('express-session');
const passport = require('passport');
const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
const cookieParser = require('cookie-parser');
const fitbitService = require('./src/services/fitbitService');

const app = express();

app.use(cookieParser());
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

passport.use(new FitbitStrategy({
  clientID: '23RPVG',
  clientSecret: 'd58610cef6c6ee4f222679aaf3116cc5',
  callbackURL: 'http://localhost:3000/auth/fitbit/callback',
  scope: [
    'activity',
    'cardio_fitness',
    'electrocardiogram',
    'heartrate',
    'location',
    'nutrition',
    'oxygen_saturation',
    'profile',
    'respiratory_rate',
    'settings',
    'sleep',
    'social',
    'temperature',
    'weight'
  ],
},
function(accessToken, refreshToken, profile, done) {
  profile.accessToken = accessToken;
  profile.refreshToken = refreshToken;
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Redirect root URL to Fitbit login
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/profile'); // If authenticated, redirect to profile
  } else {
    res.redirect('/login/fitbit'); // If not authenticated, redirect to Fitbit login
  }
});

app.get('/login/fitbit', passport.authenticate('fitbit', { scope: [
  'activity',
  'cardio_fitness',
  'electrocardiogram',
  'heartrate',
  'location',
  'nutrition',
  'oxygen_saturation',
  'profile',
  'respiratory_rate',
  'settings',
  'sleep',
  'social',
  'temperature',
  'weight'
] }));
app.get('/auth/fitbit/callback',
  passport.authenticate('fitbit', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {

    const user = req.user;
    // console.log(user._json.user.displayName);
    // console.log(user.displayName);
    res.render('profile', { user: user._json.user });

  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.get('/bodycomp', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const bodyCompData = await fitbitService.getBMIForWeek(req.session.passport.user.accessToken);
      const weightData = await fitbitService.getWeightData(req.session.passport.user.accessToken);
      res.render('bodycomp', { userBody: bodyCompData, userWeight: weightData });

      // console.log(userBody[0].bmi);
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error fetching body composition data:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/activities', async (req, res) => {
  if (req.isAuthenticated()) {
    const activitiesData = await fitbitService.getActivitiesData(req.session.passport.user.accessToken);
    res.json(activitiesData);
  } else {
    res.redirect('/login/fitbit');
  }
});
app.get('/nutrition', async (req, res) => {
  if (req.isAuthenticated()) {
    const nutritionData = await fitbitService.getNutritionData(req.session.passport.user.accessToken);
    res.render('nutrition', { userNutrition: nutritionData });
    // res.json(nutritionData);
  } else {
    res.redirect('/login/fitbit');
  }
});
app.get('/sleep', async (req, res) => {
  if (req.isAuthenticated()) {
    const sleepData = await fitbitService.getSleepData(req.session.passport.user.accessToken);
    res.render('sleep', { userSleep: sleepData });
  } else {
    res.redirect('/login/fitbit');
  }
});

app.post('/bodycomp', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const weight = req.body.weight; // Access weight from the form data
      await fitbitService.createWeightData(req.session.passport.user.accessToken, weight);
      res.status(200).send('Data successfully posted');
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error posting body composition data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/nutrition', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const food = req.body.food; // Access food from the form data
      await fitbitService.createNutritionData(req.session.passport.user.accessToken, foodId, mealTypeId, amount);
      res.status(200).send('Data successfully posted');
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error posting nutrition data:', error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});