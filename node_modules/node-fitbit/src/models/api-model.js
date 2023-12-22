"use strict";

/**
 * API Model
 */

var APIModel = {
        user: {
            GET: {
                url: 'profile'
            },
            POST: {
                url: 'profile',
                dataParams: [
                    // all optional but at least one required
                    'gender', //Gender; (MALE/FEMALE/NA)
                    'birthday', //Date of Birth; in the format yyyy-MM-dd
                    'height', //Height; in the format X.XX, in the unit system that corresponds to the Accept-Language header provided
                    'nickname', //Nickname
                    'aboutMe', //About Me string
                    'fullname', //Full name
                    'country', //Country; two-character code
                    'state', //US State; two-character code; valid only if country was or being set to US
                    'city', //City
                    'strideLengthWalking', //Walking stride length; in the format X.XX, in the unit system that corresponds to the Accept-Language header provided
                    'strideLengthRunning', //Running stride length; in the format X.XX, in the unit system that corresponds to the Accept-Language header provided
                    'weightUnit', //Default water unit on website (doesn't affect API); one of (en_US, en_GB, "any" for METRIC)
                    'heightUnit', //'Default height/distance unit on website (doesn't affect API); one of (en_US, "any" for METRIC)
                    'waterUnit', //'Default water unit on website (doesn't affect API); one of (en_US, "any" for METRIC)
                    'glucoseUnit', //'Default glucose unit on website (doesn't affect API); one of (en_US, "any" for METRIC)
                    'timezone', //Timezone; in the format "America/Los_Angeles"
                    'foodsLocale', //Food Database Locale; in the format "xx_XX"
                    'locale', //Locale of website (country/language); one of the locales, currently – (en_US, fr_FR, de_DE, es_ES, en_GB, en_AU, en_NZ, ja_JP)
                    'localeLang', //Language; in the format "xx". You should specify either locale or both - localeLang and localeCountry (locale is higher priority).
                    'localeCountry', //Country; in the format "XX". You should specify either locale or both - localeLang and localeCountry (locale is higher priority).
                    'startDayOfWeek' //Start day of the week; what day the week should start on. Should be Sunday or Monday.
                ]
            }
        },
        bodyMeasurements: {
            GET: {
                url: 'body/date/',
                dateRequired: true
            },
            POST: {
                url: 'body',
                dataParams: [
                    'bicep',  // Bicep; in the format X.XX
                    'calf',  // Calf; in the format X.XX
                    'chest',  // Chest; in the format X.XX
                    'fat',  // Body Fat %; in the format X.XX
                    'forearm',  // Forearm; in the format X.XX
                    'hips',  // Hips; in the format X.XX
                    'neck',  // Neck; in the format X.XX
                    'thigh',  // Thigh; in the format X.XX
                    'waist',  // Waist; in the format X.XX
                    'weight'  // Weight; in the format X.XX
                ]
            }
        },
        bodyWeight: {
            GET: {
                url: 'body/log/weight/date/',
                dateRequired: true
            },
            POST: {
                url: 'body/log/weight',
                dataParams: [
                    'weight',// required Weight; in the format X.XX, in the unit system that corresponds to the Accept-Language header provided
                    'date', //required Log entry date; in the format yyyy-MM-dd
                    'time' //optional Time of the measurement; hours and minutes in the format HH:mm:ss; set to last second of the day if not provided
                ]
            },
            DELETE: {
                url: 'body/log/weight/'
            }
        },
        bodyFat: {
            GET: {
                url: 'body/log/fat/date/',
                dateRequired: true
            },
            POST: {
                url: 'body/log/fat',
                dataParams: [
                    'fat', //Body Fat; in the format X.XX, in the unit system that corresponds to the Accept-Language header provided
                    'date', //Log entry date; in the format yyyy-MM-dd
                    'time' //Time of the measurement; hours and minutes in the format HH:mm:ss; set to last second of the day if not provided
                ]
            },
            DELETE: {
                url: 'body/log/fat/'
            }
        },
        sleep: {
            GET: {
                url: 'sleep/date/',
                dateRequired: true
            },
            POST: {
                url: 'sleep',
                dataParams: [
                    'startTime', //Start time; hours and minutes in the format HH:mm
                    'duration',  // Duration; in milliseconds
                    'date'       // Log entry date; in the format yyyy-MM-dd
                ]
            },
            DELETE: {
                url: 'sleep/'
            }
        },
        heartRate:{
            GET: {
                url: 'heart/date/',
                dateRequired: true
            },
            POST: {
                url: 'heart',
                dataParams:[
                    'tracker','heartRate','date'
                ]
            },
            DELETE: {
                url: 'heart/'
            }
        },
        glucose: {
            GET: {
                url: 'glucose/date/',
                dateRequired: true
            },
            POST: {
                url: 'glucose',
                dataParams:[
                    'tracker','glucose=3','date'
                ]
            }
        },
        bloodPressure: {
            GET: {
                url: 'bp/date/',
                dateRequired: true
            },
            POST: {
                url: 'bp',
                dataParams:[
                    'systolic','diastolic','date'
                ]
            },
            DELETE: {
                url: 'bp/'
            }
        },
        badges: {
            GET: {
                url: 'badges'
            }
        },
        weightGoal: {
            GET: {
                url: 'body/log/weight/goal'
            },
            POST: {
                url: '/body/log/weight/goal',
                dataParams: [
                    'startDate', //required- Weight goal start date; in the format yyyy-MM-dd
                    'startWeight', //required- Weight goal start weight; in the format X.XX, in the unit system that corresponds to the Accept-Language header provided
                    'weight' // required/optional Weight goal target weight; in the format X.XX, in the unit system that corresponds to the Accept-Language header provided; required if user doesn't have a weight goal
                ]
            }
        },
        fatGoal: {
            GET: {
                url: 'body/log/fat/goal'
            },
            POST: {
                url: 'body/log/fat/goal',
                dataParams: [
                    'fat' //Target body fat in %; in the format X.XX
                ]
            }
        },
        activities: {
            GET: {
                url: 'activities/date/',
                dateRequired:true
            },
            POST: {
                url: 'activities',
                dataParams: [
                    'activityId',// optional / required Activity id; id of the activity, directory activity or intensity level activity; if you pass directory activity id Fitbit will calculate and substitute it with the intensity level activity id, based on distance/duration
                    'activityName',// optional/required Custom activity name; either activityId or activityName should be provided
                    'manualCalories',// optional/required Manual calories; amount of calories defined manually; required with activityName parameter, otherwise optional
                    'startTime',// required Start time; hours and minutes in the format HH:mm
                    'durationMillis',// required Duration; in milliseconds
                    'date',// required Log entry date; in the format yyyy-MM-dd
                    'distance', // optional/required Distanfce; required for logging directory activity; in the format X.XX, in the selected distanceUnit or in the unit system that corresponds to the Accept-Language header provided
                    'distanceUnit' //optional Distance measurement unit; Steps units are available only for "Walking" (activityId=90013) and "Running" (activityId=90009) directory activities and their intensity levels
                ]
            },
            DELETE: {
                url: 'activities/'
            }
        },
        browsePublicActivities:{
            GET: {
                publicParam: true,
                url: 'activities'
            }
        },
        publicActivity:{
            GET: {
                publicParam: true,
                url: 'activities/{{}}',
                idPlaceholder: ['id']
            }
        },
        timeSeries:{
            GET: {
                url: '',
                timeSeries: true,
                categories: [{
                    category: 'body',
                    subcategories: [
                        'fat',
                        'weight',
                        'bmi'
                    ]
                },{
                    category: 'activities',
                    subcategories: [
                        'calories',
                        'caloriesBMR',
                        'steps',
                        'distance',
                        'floors',
                        'elevation',
                        'heart',
                        'minutesSedentary',
                        'minutesLightlyActive',
                        'minutesFairlyActive',
                        'minutesVeryActive',
                        'activityCalories',
                        'tracker/calories',
                        'tracker/steps',
                        'tracker/distance',
                        'tracker/floors',
                        'tracker/elevation',
                        'tracker/minutesSedentary',
                        'tracker/minutesLightlyActive',
                        'tracker/minutesFairlyActive',
                        'tracker/minutesVeryActive',
                        'tracker/activityCalories'
                    ]
                },{
                    category: 'sleep',
                    subcategories: [
                        'startTime',
                        'timeInBed',
                        'minutesAsleep',
                        'awakeningsCount',
                        'minutesAwake',
                        'minutesToFallAsleep',
                        'minutesAfterWakeup',
                        'efficiency'
                    ]
                },{
                    category: 'foods',
                    subcategories: [
                        'log/caloriesIn',
                        'log/water'
                    ]
                }],
                dateRequired: true // will be true by default
            }
        },
        recentActivity: {
            GET: {
                url: 'activities/recent'
            }
        },
        frequentActivity: {
            GET: {
                url: 'activities/frequent'
            }
        },
        favoriteActivity: {
            GET: {
                url: 'activities/favorite'
            },
            POST: {
                url: 'activities/log/favorite/',
                appendId: true,
                dataParams:[]
            },
            DELETE: {
                url: 'activities/favorite/'
            }
        },
        activityDailyGoal: {
            GET: {
                url: 'activities/goals/daily'
            },
            POST: {
                url: 'activities/goals/daily',
                dataParams: [
                    'caloriesOut', // New goal value; in an integer format
                    'activeMinutes', // New goal value; in an integer format
                    'floors', // New goal value; in an integer format
                    'distance', // New goal value; in the format X.XX or integer
                    'steps' // New goal value; in an integer format
                ]
            }
        },
        activityWeeklyGoal: {
            GET: {
                url: 'activities/goals/weekly'
            },
            POST: {
                url: 'activities/goals/weekly',
                dataParams: [
                    'floors', // New goal value; in an integer format
                    'distance', // New goal value; in the format X.XX or integer
                    'steps' // New goal value; in an integer format
                ]
            }
        },
        activityStats: {
            GET: {
                url: 'activities'
            }
        },
        foods: {
            GET: {
                dateRequired: true,
                url: 'foods/log/date/'
            },
            POST: {
                url: 'foods/log',
                dataParams: [
                    'foodId',       //  optional/required    Food id
                    'foodName',     // optional/required  Food entry name; either foodId or foodName should be provided
                    'brandName',    // optional Brand name; valid only with foodName parameter
                    'calories',     // optional Calories for this serving size; allowed with foodName parameter (defaults to 0), otherwise ignored
                    'mealTypeId',   //  required    Meal type id; (1 – Breakfast; 2 – Morning Snack; 3 – Lunch; 4 – Afternoon Snack; 5 – Dinner; 7 – Anytime)
                    'unitId',       //  required    Unit id; typically retrieved via a previous calls to Get Foods (Recent, Frequent, Favorite), Search Foods or Get Food Units
                    'amount',       //  required    Amount consumed; in the format X.XX, in a selected unit (unitId)
                    'date',         //    required    Log entry date; in the format yyyy-MM-dd
                    'favorite'      //    optional    Add food to favorites after creating log entry?; valid only with foodId; (true/false)
                ]
            },
            DELETE: {
                url: 'foods/log/',
            }
        },
        recentFoods: {
            GET: {
                url: 'foods/log/recent'
            }
        },
        favoriteFoods: {
            GET: {
                url: 'foods/log/favorite'
            },
            DELETE: {
                url: 'foods/log/favorite/'
            }
        },
        frequentFoods: {
            GET: {
                url: 'foods/log/frequent'
            }
        },
        searchFoods:{
            GET: {
                publicParam: true,
                url: 'foods/search',
                addQuery: true
            }
        },
        publicFoods: {
            GET: {
                publicParam: true,
                url: 'foods'
            }
        },
        foodUnits:{
            GET: {
                publicParam: true,
                url: 'foods/units'
            }
        },
        water: {
            GET: {
                dateRequired: true,
                url: 'foods/log/water/date/'
            },
            POST: {
                dateRequired: false,
                url: 'foods/log/water',
                dataParams:[
                    'amount',   // required Amount consumed; in the format X.X, in the selected waterUnit or in the unit system that corresponds to the Accept-Language header provided
                    'date',     // required Log entry date; in the format yyyy-MM-dd
                    'unit'      // optional Water measurement unit; ("ml", "fl oz" or "cup")
                ]
            },
            DELETE: {
                url: 'foods/log/water/'
            }
        },
        meals: {
            GET: {
                url: 'meals'
            }
        },
        subscriptions: {
            GET: {
                url: 'apiSubscriptions'
            }
        },
        device:{
            GET: {
                url: 'devices/{{}}',
                idPlaceholder: ['id']
            }
        },
        devices:{
            GET: {
                url: 'devices'
            }
        },
        invitations: {
            GET: {
                url: 'friends/invitations'
            },
            POST: {
                url: 'friends/invitations/',
                appendId: true,
                dataParams:[
                    'accept'
                ]
            }
        },
        createInvite:{
            POST: {
                url: 'friends/invitations',
                dataParams:[
                    'invitedUserEmail'
                ]
            }
        },
        friends: {
            GET: {
                url: 'friends'
            }
        },
        leaderboard: {
            GET: {
                url: 'friends/leaderboard'
            }
        },
        alarm: {
            GET: {
                url: 'devices/tracker/{{}}/alarms',
                idPlaceholder: ['id']
            },
            POST: {
                url: 'devices/tracker/{{}}/alarms/{{}}',
                idPlaceholder: ['deviceId','alarmId']
            },
            DELETE: {
                url: 'devices/tracker/{{}}/alarms/{{}}',
                idPlaceholder: ['deviceId','alarmId']
            }
        },
        createAlarm:{
            POST: {
                url: 'devices/tracker/{{}}/alarms',
                idPlaceholder: ['deviceId']
            }
        }

    };


module.exports = APIModel;
