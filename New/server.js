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
      console.log(weightData);
      console.log(bodyCompData);
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
    res.json(nutritionData);
  } else {
    res.redirect('/login/fitbit');
  }
});
app.get('/sleep', async (req, res) => {
  if (req.isAuthenticated()) {
    const sleepData = await fitbitService.getSleepData(req.session.passport.user.accessToken);
    res.json(sleepData);
  } else {
    res.redirect('/login/fitbit');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
{/* <script async defer>
const labels = []; 
const data = []; 
userBody['body-bmi'].forEach((day) => { 
labels.push(day.dateTime); 
data.push(day.value); 
}); 
console.log("labels from bodycomp="+labelsJSON);
const ctx = document.getElementById('bmi-chart'); 
new Chart(ctx, {
  type: 'line',
  data: {
      labels: JSON.parse(labelsJSON),
    datasets: [{
      label: 'BMI',
      data: JSON.parse(dataJSON),
       fill: false,
       borderColor: 'rgb(75, 192, 192)',
       tension: 0.1
     }]
   }
 })
</script> */}