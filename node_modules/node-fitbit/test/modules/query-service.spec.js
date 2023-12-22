"use strict";

/**
 * Query Service Spec
 **/


var expect = require('chai').expect;

var QueryService = require('./../../src/modules/query-service');


describe('Query Service', function(){

    describe('Generate queries', function(){

        describe('User', function(){
            it('should obtain GET user query', _GenerateQueries__User__GET);
            it('should obtain POST user query', _GenerateQueries__User__POST);
            it('should NOT obtain DELETE user query', _GenerateQueries__User__DELETE);
        });

        describe('Body Measurements', function(){
            it('should obtain GET body-measurements query', _GenerateQueries__BodyMeasurements_GET);
            it('should obtain POST body-measurements query', _GenerateQueries__BodyMeasurements_POST);
            it('should NOT obtain DELETE body-measurements query', _GenerateQueries__BodyMeasurements_DELETE);
        });

        describe('Body Weights', function(){
            it('should obtain GET body-weights query', _GenerateQueries__BodyWeights_GET);
            it('should obtain POST body-weights query', _GenerateQueries__BodyWeights_POST);
            it('should obtain DELETE body-weights query', _GenerateQueries__BodyWeights_DELETE);
        });

        describe('Body Fat', function(){
            it('should obtain GET body-fat query', _GenerateQueries__BodyFat_GET);
            it('should obtain POST body-fat query', _GenerateQueries__BodyFat_POST);
            it('should obtain DELETE body-fat query', _GenerateQueries__BodyFat_DELETE);
        });

        describe('Badges', function(){
            it('should obtain GET badges query', _GenerateQueries__Badge_GET);
            it('should obtain POST badges query', _GenerateQueries__Badge_POST);
            it('should NOT obtain DELETE badges query', _GenerateQueries__Badge_DELETE);
        });

        describe('Time series', function(){
            it('should obtain GET time series query', _GenerateQueries__TimeSeries_GET);
            it('should NOT obtain POST time series query', _GenerateQueries__TimeSeries_POST);
            it('should NOT obtain DELETE time series query', _GenerateQueries__TimeSeries_DELETE);
        });

        describe('Weight Goal', function(){
            it('should obtain GET weight-goal query', _GenerateQueries__WeightGoal_GET);
            it('should obtain POST weight-goal query', _GenerateQueries__WeightGoal_POST);
            it('should NOT obtain DELETE weight-goal query', _GenerateQueries__WeightGoal_DELETE);
        });

        describe('Fat Goal', function(){
            it('should obtain GET fat-goal query', _GenerateQueries__fatGoal_GET);
            it('should obtain POST fat-goal query', _GenerateQueries__fatGoal_POST);
            it('should obtain DELETE fat-goal query', _GenerateQueries__fatGoal_DELETE);
        });

        describe('Public Activity', function(){
            it('should obtain GET Public activities query', _GenerateQueries__publicActivities_GET);
            it('should obtain POST Public activities query', _GenerateQueries__publicActivities_POST);
            it('should NOT obtain DELETE Public activities query', _GenerateQueries__publicActivities_DELETE);

            it('should obtain GET specific public activity query', _GenerateQueries__specificPublicActivity_GET);
            it('should obtain POST specific public activity query', _GenerateQueries__specificPublicActivity_POST);
            it('should NOT obtain DELETE specific public activity query', _GenerateQueries__specificPublicActivity_DELETE);
        });


        describe('Activities', function(){
            it('should obtain GET activities query', _GenerateQueries__activities_GET);
            it('should obtain POST activities query', _GenerateQueries__activities_POST);
            it('should obtain DELETE activities query', _GenerateQueries__activities_DELETE);
        });

        describe('recent-activity', function(){
            it('should obtain GET recent-activity query', _GenerateQueries__recentActivity_GET);
            it('should obtain POST recent-activity query', _GenerateQueries__recentActivity_POST);
            it('should obtain DELETE recent-activity query', _GenerateQueries__recentActivity_DELETE);
        });

        describe('frequent-activity', function(){
            it('should obtain GET recent-activity query', _GenerateQueries__frequentActivity_GET);
            it('should obtain POST recent-activity query', _GenerateQueries__frequentActivity_POST);
            it('should obtain DELETE recent-activity query', _GenerateQueries__frequentActivity_DELETE);
        });

        describe('favorite-activity', function(){
            it('should obtain GET favorite-activity query', _GenerateQueries__favoriteActivity_GET);
            it('should obtain POST favorite-activity query', _GenerateQueries__favoriteActivity_POST);
            it('should obtain DELETE favorite-activity query', _GenerateQueries__favoriteActivity_DELETE);
        });

        describe('activity-daily-goal', function(){
            it('should obtain GET activity-daily-goal query', _GenerateQueries__activityDailyGoal_GET);
            it('should obtain POST activity-daily-goal query', _GenerateQueries__activityDailyGoal_POST);
            it('should obtain DELETE activity-daily-goal query', _GenerateQueries__activityDailyGoal_DELETE);
        });

        describe('activity-weekly-goal', function(){
            it('should obtain GET activity-week-goal query', _GenerateQueries__activityWeeklyGoal_GET);
            it('should obtain POST activity-week-goal query', _GenerateQueries__activityWeeklyGoal_POST);
            it('should obtain DELETE activity-week-goal query', _GenerateQueries__activityWeeklyGoal_DELETE);
        });

        describe('activity-stats', function(){
            it('should obtain GET activity-stats query', _GenerateQueries__activityStats_GET);
            it('should obtain POST activity-stats query', _GenerateQueries__activityStats_POST);
            it('should obtain DELETE activity-stats query', _GenerateQueries__activityStats_DELETE);
        });

        describe('Search Food', function(){
            it('should obtain GET search-food query', _GenerateQueries__searchFood_GET);
            it('should obtain POST search-food query', _GenerateQueries__searchFood_POST);
            it('should obtain DELETE search-food query', _GenerateQueries__searchFood_DELETE);
        });

        describe('Get Public food', function(){
            // TODO
        });

        describe('Food Units', function(){
            it('should obtain GET food-units query', _GenerateQueries__foodunits_GET);
        });

        describe('Food', function(){
            it('should obtain GET food query', _GenerateQueries__food_GET);
            it('should obtain POST food query', _GenerateQueries__food_POST);
            it('should obtain DELETE food query', _GenerateQueries__food_DELETE);
        });

        describe('Recent Foods', function(){
            it('should obtain GET recent-food query', _GenerateQueries__recentFood_GET);
            it('should obtain POST recent-food query', _GenerateQueries__recentFood_POST);
            it('should obtain DELETE recent-food query', _GenerateQueries__recentFood_DELETE);
        });

        describe('Frequent Foods', function(){
            it('should obtain GET Frequent-food query', _GenerateQueries__frequentFood_GET);
            it('should obtain POST Frequent-food query', _GenerateQueries__frequentFood_POST);
            it('should obtain DELETE Frequent-food query', _GenerateQueries__frequentFood_DELETE);
        });

        describe('Favorite Foods', function(){
            it('should obtain GET Favorite-food query', _GenerateQueries__favoriteFood_GET);
            it('should obtain POST Favorite-food query', _GenerateQueries__favoriteFood_POST);
            it('should obtain DELETE Favorite-food query', _GenerateQueries__favoriteFood_DELETE);
        });

        describe('Water', function(){
            it('should obtain GET Water query', _GenerateQueries__water_GET);
            it('should obtain POST Water query', _GenerateQueries__water_POST);
            it('should obtain DELETE Water query', _GenerateQueries__water_DELETE);
        });

        describe('Meals', function(){
            it('should obtain GET meals query', _GenerateQueries__meals_GET);
            it('should obtain POST meals query', _GenerateQueries__meals_POST);
            it('should obtain DELETE meals query', _GenerateQueries__meals_DELETE);
        });

        describe('Sleep', function(){
            it('should obtain GET sleep query', _GenerateQueries__sleep_GET);
            it('should obtain POST sleep query', _GenerateQueries__sleep_POST);
            it('should obtain DELETE sleep query', _GenerateQueries__sleep_DELETE);
        });

        describe('Glucose', function(){
            it('should obtain GET glucose query', _GenerateQueries__glucose_GET);
            it('should obtain POST glucose query', _GenerateQueries__glucose_POST);
            it('should obtain DELETE glucose query', _GenerateQueries__glucose_DELETE);
        });

        describe('Heart Rate', function(){
            it('should obtain GET heart rate query', _GenerateQueries__heart_GET);
            it('should obtain POST heart rate query', _GenerateQueries__heart_POST);
            it('should obtain DELETE heart rate query', _GenerateQueries__heart_DELETE);
        });

        describe('Blood Pressure', function(){
            it('should obtain GET blood pressure query', _GenerateQueries__bloodPressure_GET);
            it('should obtain POST blood pressure query', _GenerateQueries__bloodPressure_POST);
            it('should obtain DELETE blood pressure query', _GenerateQueries__bloodPressure_DELETE);
        });

        describe('Invitations', function(){
            it('should obtain GET invitations query', _GenerateQueries__invitations_GET);
            it('should obtain POST invitations query', _GenerateQueries__invitations_POST);
            it('should obtain DELETE invitations query', _GenerateQueries__invitations_DELETE);
        });

        describe('Create Invite', function(){
            it('should obtain POST create invite query', _GenerateQueries__createInvite_POST);
        });

        describe('Friends', function(){
            it('should obtain GET friends query', _GenerateQueries__friends_GET);
            it('should obtain POST friends query', _GenerateQueries__friends_POST);
            it('should obtain DELETE friends query', _GenerateQueries__friends_DELETE);
        });

        describe('Leaderboard', function(){
            it('should obtain GET leaderboard query', _GenerateQueries__leaderboard_GET);
            it('should obtain POST leaderboard query', _GenerateQueries__leaderboard_POST);
            it('should obtain DELETE leaderboard query', _GenerateQueries__leaderboard_DELETE);
        });

        describe('time-series', function(){
            it('should obtain GET time-series query', _GenerateQueries__timeSeries_Get);
            it('should obtain GET time-series query handle error', _GenerateQueries__timeSeries_Get_HandleError);
        });

        describe('Alarm', function(){
            it('should obtain GET Alarm query', _GenerateQueries__alarm_GET);
            it('should obtain POST Alarm query', _GenerateQueries__alarm_POST);
            it('should obtain DELETE Alarm query', _GenerateQueries__alarm_DELETE);
            it('should obtain GET create-alarm query', _GenerateQueries__createAlarm_POST);
        });

        describe('Devices', function(){
            it('should obtain GET devices query', _GenerateQueries__devices_GET);
        });

        describe('Device', function(){
            it('should obtain GET device query', _GenerateQueries__device_GET);
        })

    });
});


/**
 * Standard GET Test
 * @param alias
 * @param stdJSONURL
 * @param dateRequired
 * @private
 */
function _GenerateQueries__StandardGETTest(alias, stdJSONURL, dateRequired, appendId){

    // TEST JSON with no ID
    var output  = stdJSONURL;
    var value   = {
        alias: alias,
        method: 'GET'
    };
    var date;
    if(dateRequired){
        date = stdJSONURL.match(/[\d-]+.(xml|json)$/);
        date = date[0].substring(0, 10);
        value.date = date;
    }
    if(appendId){
        var nummch = stdJSONURL.match(/[0-9]+.json/);
        var id = nummch[0].split('.')[0];
        if(!value.data){
            value.data = {};
        }
        value.data.id = id;
    }

    var createQuery = QueryService.create(value);
    expect(createQuery).to.equal(output);

    // TEST XML with no ID
    value.format = 'xml';
    output = output.replace('.json','.xml');
    createQuery = QueryService.create(value);
    expect(createQuery).to.equal(output);

    // TEST JSON with ID
    value.format = 'json';
    output = output.replace('.xml','.json');
    output = output.replace('-','1234');
    value.userId = 1234;

    // TEST XML with ID
    output = output.replace('.json','.xml');
    value.format = 'xml';
    createQuery = QueryService.create(value);
    expect(createQuery).to.equal(output);
/**
    if(dateRequired){
        delete value.date;
        expect(function(){
            QueryService.create(value);
        }).to.throw("Date is not set!");

        output = output.replace('.xml','.json');
        expect(function(){
            QueryService.create(value);
        }).to.throw("Date is not set!");

        output = output.replace('1234','-');
        delete value.userId;
        expect(function(){
            QueryService.create(value);
        }).to.throw("Date is not set!");

        output = output.replace('.json','.xml');
        expect(function(){
            QueryService.create(value);
        }).to.throw("Date is not set!");
    }**/
}

/**
 * Standard POST Test
 */
function _GenerateQueries__StandardPOSTTest(alias, stdJSONURL, appendId){
    // TEST JSON with no ID
    var output  = stdJSONURL;
    var value   = {
        alias: alias,
        method: 'POST'
    };

    if(appendId){ // few calls require appending Id
        var idmch = stdJSONURL.match(/[0-9]+\.json/);
        var id = idmch[0].split('.')[0];
        console.log('id',id);
        value.data = {id: id};
    }

    var postQuery = QueryService.create(value);
    expect(postQuery).to.equal(output);

    // TEST XML with no ID
    value.format = 'xml';
    output = output.replace('.json','.xml');
    postQuery = QueryService.create(value);
    expect(postQuery).to.equal(output);


    // TEST JSON with ID
    value.format = 'json';
    output = output.replace('.xml','.json');
    output = output.replace('-','1234');
    value.userId = 1234;

    // TEST XML with ID
    output = output.replace('.json','.xml');
    value.format = 'xml';
    postQuery = QueryService.create(value);
    expect(postQuery).to.equal(output);


    // add parameters

    if(!appendId) {
        // user name specified
        output += '?gender=MALE&birthday=2015-02-15';
        if (!value.data) {
            value.data = {};
        }
        value.data.gender = 'MALE';
        value.data.birthday = '2015-02-15';

        postQuery = QueryService.create(value);

        expect(postQuery).to.equal(output);

        // do the same in xml
        output = output.replace('json', 'xml');

        postQuery = QueryService.create(value);

        expect(postQuery).to.equal(output);
    }
    else{
        delete value.data;
        expect(function(){
            QueryService.create(value);
        }).to.throw("ID is required for this call");
    }
}

/**
 * Standard Delete Test
 * @param alias
 * @param stdJSONURL
 * @private
 */
function _GenerateQueries__StandardDELETETest(alias, stdJSONURL){

    var output = stdJSONURL;

    var idVal   = stdJSONURL.match(/[\d]+.json$/);
    if(!idVal){
        throw "Invalid ID value in delete test json url string";
    }

    var number = idVal[0].split('.')[0];

    var value = {
        alias: alias,
        method: 'DELETE',
        data: {
            id: number
        }
    };

    var deleteQuery = QueryService.create(value);
    expect(deleteQuery).to.equal(output);

    // try with user name
    output = output.replace('-','1234');
    value.userId = 1234;
    deleteQuery = QueryService.create(value);
    expect(deleteQuery).to.equal(output);

    // try with .xml
    output = output.replace('.json', '.xml');
    value.format = 'xml';
    deleteQuery = QueryService.create(value);
    expect(deleteQuery).to.equal(output);

    // try with .xml and no id
    output = output.replace('1234','-');
    delete value.userId;
    deleteQuery = QueryService.create(value);
    expect(deleteQuery).to.equal(output);

    // delete data.id
    delete value.data.id;
    expect(function(){
        QueryService.create(value);
    }).to.throw("Delete ID cannot be undefined");

    // delete data obj
    delete value.data;
    expect(function(){
        QueryService.create(value);
    }).to.throw("Delete ID cannot be undefined");
}

/**
 * Standard Delete Not Existing Test
 * @param alias
 * @private
 */
function _GenerateQueries__StandardNotExistTest(alias, method){
    var value = {
        alias: alias,
        method: method
    };
    expect(function(){
        QueryService.create(value);
    }).to.throw("That method, "+value.method+" does not exist for " + value.alias);
}

/**
 *
 */
function _GenerateQueries__User__GET(){
    var testJSONURL = 'https://api.fitbit.com/1/user/-/profile.json';
    _GenerateQueries__StandardGETTest('user', testJSONURL);
}

function _GenerateQueries__User__POST(){
    var output = 'https://api.fitbit.com/1/user/-/profile.json';
    _GenerateQueries__StandardPOSTTest('user', output);
}

function _GenerateQueries__User__DELETE(){
    _GenerateQueries__StandardNotExistTest('user', 'DELETE');
}

function _GenerateQueries__BodyMeasurements_GET(){
    // Date speficied, user non specfified, method get, json
    var output = 'https://api.fitbit.com/1/user/-/body/date/2015-03-01.json';
    _GenerateQueries__StandardGETTest('body-measurements',output, true);
}

/**
 * Body Measurements POST
 * @private
 */
function _GenerateQueries__BodyMeasurements_POST(){
    // Date speficied, user specfified, method get, xml
    var output = 'https://api.fitbit.com/1/user/-/body.json';
    _GenerateQueries__StandardPOSTTest('body-measurements', output);
}

function _GenerateQueries__BodyMeasurements_DELETE(){
    _GenerateQueries__StandardNotExistTest('body-measurements', 'DELETE');
}

/**
 * Body weight Get
 * @private
 */
function _GenerateQueries__BodyWeights_GET(){
    // Date speficied, user non specfified, method get, json
    var output = 'https://api.fitbit.com/1/user/-/body/log/weight/date/2015-02-21.json';
    _GenerateQueries__StandardGETTest('body-weight', output, true);
}

/**
 * Body WEight POST
 */
function _GenerateQueries__BodyWeights_POST(){
    // Date speficied, user specfified, method get, json
    var jsonURL = 'https://api.fitbit.com/1/user/-/body/log/weight.json';
    _GenerateQueries__StandardPOSTTest('body-weight', jsonURL);
}

function _GenerateQueries__BodyWeights_DELETE(){
    var jsonURL = 'https://api.fitbit.com/1/user/-/body/log/weight/300.json';
    _GenerateQueries__StandardDELETETest('body-weight', jsonURL);
}

function _GenerateQueries__BodyFat_GET(){
    // Date speficied, user non specfified, method get, json
    var output = 'https://api.fitbit.com/1/user/-/body/log/fat/date/2010-02-21.json';
    _GenerateQueries__StandardGETTest('body-fat', output, true);
}

function _GenerateQueries__BodyFat_POST(){
    // Date speficied, user specfified, method get, json
    var jsonURL = 'https://api.fitbit.com/1/user/-/body/log/fat.json';
    _GenerateQueries__StandardPOSTTest('body-fat', jsonURL);
}

function _GenerateQueries__BodyFat_DELETE(){
    var output = 'https://api.fitbit.com/1/user/-/body/log/fat/300.json';
    _GenerateQueries__StandardDELETETest('body-fat', output);
}

/**
 * Generate Queries Badge GET
 * @private
 */
function _GenerateQueries__Badge_GET(){
    var output = 'https://api.fitbit.com/1/user/-/badges.json';
    _GenerateQueries__StandardGETTest('badges', output);
}

function _GenerateQueries__Badge_POST(){
    _GenerateQueries__StandardNotExistTest('badges','POST');
}

function _GenerateQueries__Badge_DELETE(){
    _GenerateQueries__StandardNotExistTest('badges', 'DELETE');
}

function _GenerateQueries__WeightGoal_GET(){
    var output = 'https://api.fitbit.com/1/user/-/body/log/weight/goal.json';
    _GenerateQueries__StandardGETTest('weight-goal', output);
}
function _GenerateQueries__WeightGoal_POST(){
    // TODO
}

function _GenerateQueries__WeightGoal_DELETE(){
    _GenerateQueries__StandardNotExistTest('weight-goal', 'DELETE');
}

/**
 * Generate Queries => Series Query
 * @private
 */
function _GenerateQueries__seriesQuery(){

}

function _GenerateQueries__fatGoal_GET(){
    var output = 'https://api.fitbit.com/1/user/-/body/log/fat/goal.json';
    _GenerateQueries__StandardGETTest('fat-goal', output);
}

function _GenerateQueries__fatGoal_POST(){
    var jsonURL = 'https://api.fitbit.com/1/user/-/body/log/fat/goal.json';
    _GenerateQueries__StandardPOSTTest('fat-goal', jsonURL);
}

function _GenerateQueries__fatGoal_DELETE(){
    _GenerateQueries__StandardNotExistTest('fat-goal', 'DELETE');
}

/**
 * Generate Queries => Activities Query
 * @private
 */
function _GenerateQueries__activities_GET(){
    var jsonURL = 'https://api.fitbit.com/1/user/-/activities/date/2010-06-02.json';
    _GenerateQueries__StandardGETTest('activities', jsonURL, true);
}
function _GenerateQueries__activities_POST(){
    var jsonURL = 'https://api.fitbit.com/1/user/-/activities.json';
    _GenerateQueries__StandardPOSTTest('activities', jsonURL);
}
function _GenerateQueries__activities_DELETE(){
    var jsonURL = 'https://api.fitbit.com/1/user/-/activities/123.json';
    _GenerateQueries__StandardDELETETest('activities', jsonURL);
}
function _GenerateQueries__publicActivities_GET(){
    var output = 'https://api.fitbit.com/1/activities.json';
    _GenerateQueries__StandardGETTest('browse-public-activities', output);
}
function _GenerateQueries__publicActivities_POST(){
    _GenerateQueries__StandardNotExistTest('browse-public-activities', 'POST');
}
function _GenerateQueries__publicActivities_DELETE(){
    _GenerateQueries__StandardNotExistTest('browse-public-activities', 'DELETE');
}
function _GenerateQueries__specificPublicActivity_GET(){
    var output = 'https://api.fitbit.com/1/activities/90009.json';
    _GenerateQueries__StandardGETTest('public-activity', output, false, true);
}
function _GenerateQueries__specificPublicActivity_POST(){
    _GenerateQueries__StandardNotExistTest('public-activity', 'POST');
}
function _GenerateQueries__specificPublicActivity_DELETE(){
    _GenerateQueries__StandardNotExistTest('public-activity', 'DELETE');
}
function _GenerateQueries__recentActivity_GET() {
    var output = 'https://api.fitbit.com/1/user/-/activities/recent.json';
    _GenerateQueries__StandardGETTest('recent-activity', output);
}
function _GenerateQueries__recentActivity_POST() {
    _GenerateQueries__StandardNotExistTest('recent-activity', 'POST');
}
function _GenerateQueries__recentActivity_DELETE(){
    _GenerateQueries__StandardNotExistTest('recent-activity', 'DELETE');
}
function _GenerateQueries__frequentActivity_GET() {
    var output = 'https://api.fitbit.com/1/user/-/activities/frequent.json';
    _GenerateQueries__StandardGETTest('frequent-activity', output);
}
function _GenerateQueries__frequentActivity_POST() {
    _GenerateQueries__StandardNotExistTest('frequent-activity', 'POST');
}
function _GenerateQueries__frequentActivity_DELETE() {
    _GenerateQueries__StandardNotExistTest('frequent-activity', 'DELETE');
}
function _GenerateQueries__favoriteActivity_GET(){
    var jsonURL = 'https://api.fitbit.com/1/user/-/activities/favorite.json';
    _GenerateQueries__StandardGETTest('favorite-activity', jsonURL);
}
function _GenerateQueries__favoriteActivity_POST(){
    var jsonURL = 'https://api.fitbit.com/1/user/-/activities/log/favorite/1.json';
    _GenerateQueries__StandardPOSTTest('favorite-activity',jsonURL, true);
}
function _GenerateQueries__favoriteActivity_DELETE(){
    var jsonURL = 'https://api.fitbit.com/1/user/-/activities/favorite/1.json';
    _GenerateQueries__StandardDELETETest('favorite-activity', jsonURL);
}
function _GenerateQueries__activityDailyGoal_GET(){
    var output = 'https://api.fitbit.com/1/user/-/activities/goals/daily.json';
    _GenerateQueries__StandardGETTest('activity-daily-goal', output);
}
function _GenerateQueries__activityDailyGoal_POST(){
    var output = 'https://api.fitbit.com/1/user/-/activities/goals/daily.json';
    _GenerateQueries__StandardPOSTTest('activity-daily-goal', output);
}
function _GenerateQueries__activityDailyGoal_DELETE(){
    _GenerateQueries__StandardNotExistTest('activity-daily-goal', 'DELETE');
}
function _GenerateQueries__activityWeeklyGoal_GET(){
    var output = 'https://api.fitbit.com/1/user/-/activities/goals/weekly.json';
    _GenerateQueries__StandardGETTest('activity-weekly-goal', output);
}
function _GenerateQueries__activityWeeklyGoal_POST(){
    var output = 'https://api.fitbit.com/1/user/-/activities/goals/weekly.json';
    _GenerateQueries__StandardPOSTTest('activity-weekly-goal', output);
}
function _GenerateQueries__activityWeeklyGoal_DELETE(){
    _GenerateQueries__StandardNotExistTest('activity-weekly-goal', 'DELETE');
}
function _GenerateQueries__activityStats_GET(){
    var output = 'https://api.fitbit.com/1/user/-/activities.json';
    _GenerateQueries__StandardGETTest('activity-stats', output);
}

function _GenerateQueries__activityStats_POST(){
    _GenerateQueries__StandardNotExistTest('activity-stats', 'POST');
}

function _GenerateQueries__activityStats_DELETE(){
    _GenerateQueries__StandardNotExistTest('activity-stats', 'DELETE');
}
function _GenerateQueries__foodunits_GET(){
    var json = 'https://api.fitbit.com/1/foods/units.json';
    _GenerateQueries__StandardGETTest('food-units', json);
}
function _GenerateQueries__food_GET(){
    var output = 'https://api.fitbit.com/1/user/-/foods/log/date/2015-06-02.json';
    _GenerateQueries__StandardGETTest('foods', output);
}
function _GenerateQueries__food_POST(){
    var json = 'https://api.fitbit.com/1/user/-/foods/log.json';
    _GenerateQueries__StandardPOSTTest('foods', json);
}
function _GenerateQueries__food_DELETE(){
    var output = 'https://api.fitbit.com/1/user/-/foods/log/123.json';
    _GenerateQueries__StandardDELETETest('foods', output);
}
function _GenerateQueries__searchFood_GET(){
    var output = 'https://api.fitbit.com/1/foods/search.json';
    _GenerateQueries__StandardGETTest('search-foods', output);
}
function _GenerateQueries__searchFood_POST(){
    _GenerateQueries__StandardNotExistTest('search-foods', 'POST');
}
function _GenerateQueries__searchFood_DELETE(){
    _GenerateQueries__StandardNotExistTest('search-foods', 'POST');
}
function _GenerateQueries__recentFood_GET(){
    var output = 'https://api.fitbit.com/1/user/-/foods/log/recent.json';
    _GenerateQueries__StandardGETTest('recent-foods', output);
}
function _GenerateQueries__recentFood_POST(){
    _GenerateQueries__StandardNotExistTest('recent-foods', 'POST');
}
function _GenerateQueries__recentFood_DELETE(){
    _GenerateQueries__StandardNotExistTest('recent-foods', 'DELETE');
}
function _GenerateQueries__frequentFood_GET(){
    var output = 'https://api.fitbit.com/1/user/-/foods/log/frequent.json';
    _GenerateQueries__StandardGETTest('frequent-foods', output);
}
function _GenerateQueries__frequentFood_POST(){
    _GenerateQueries__StandardNotExistTest('frequent-foods', 'POST');
}
function _GenerateQueries__frequentFood_DELETE(){
    _GenerateQueries__StandardNotExistTest('frequent-foods', 'DELETE');
}
function _GenerateQueries__favoriteFood_GET(){
    var output = 'https://api.fitbit.com/1/user/-/foods/log/favorite.json';
    _GenerateQueries__StandardGETTest('favorite-foods', output);
}
function _GenerateQueries__favoriteFood_POST(){
    _GenerateQueries__StandardNotExistTest('favorite-foods', 'POST');
}
function _GenerateQueries__favoriteFood_DELETE(){
    var output = 'https://api.fitbit.com/1/user/-/foods/log/favorite/123.json';
    _GenerateQueries__StandardDELETETest('favorite-foods', output);
}
function _GenerateQueries__water_GET(){
    var output = 'https://api.fitbit.com/1/user/-/foods/log/water/date/2015-06-02.json';
    _GenerateQueries__StandardGETTest('water', output);
}
function _GenerateQueries__water_POST(){
    var output = 'https://api.fitbit.com/1/user/-/foods/log/water.json';
    _GenerateQueries__StandardPOSTTest('water', output);
}
function _GenerateQueries__water_DELETE(){
    var output = 'https://api.fitbit.com/1/user/-/foods/log/water/123.json';
    _GenerateQueries__StandardDELETETest('water', output);
}
function _GenerateQueries__meals_GET(){
    var json = 'https://api.fitbit.com/1/user/-/meals.json';
    _GenerateQueries__StandardGETTest('meals', json);
}
function _GenerateQueries__meals_POST(){
    _GenerateQueries__StandardNotExistTest('meals', 'POST');
}
function _GenerateQueries__meals_DELETE(){
    _GenerateQueries__StandardNotExistTest('meals', 'DELETE');
}
function _GenerateQueries__sleep_GET(){
    var json = 'https://api.fitbit.com/1/user/-/sleep/date/2015-06-02.json';
    _GenerateQueries__StandardGETTest('sleep', json);
}
function _GenerateQueries__sleep_POST(){
    var json = 'https://api.fitbit.com/1/user/-/sleep.json';
    _GenerateQueries__StandardPOSTTest('sleep', json);
}
function _GenerateQueries__sleep_DELETE(){
    var json = 'https://api.fitbit.com/1/user/-/sleep/123.json';
    _GenerateQueries__StandardDELETETest('sleep', json);
}
function _GenerateQueries__heart_GET(){
    var json = 'https://api.fitbit.com/1/user/-/heart/date/2015-06-02.json';
    _GenerateQueries__StandardGETTest('heart-rate', json);
}
function _GenerateQueries__heart_POST(){
    var json = 'https://api.fitbit.com/1/user/-/heart.json';
    _GenerateQueries__StandardPOSTTest('heart-rate', json);
}
function _GenerateQueries__heart_DELETE(){
    var json = 'https://api.fitbit.com/1/user/-/heart/123.json';
    _GenerateQueries__StandardDELETETest('heart-rate', json);
}
function _GenerateQueries__bloodPressure_GET(){
    var json = 'https://api.fitbit.com/1/user/-/bp/date/2015-06-02.json';
    _GenerateQueries__StandardGETTest('blood-pressure', json);
}
function _GenerateQueries__bloodPressure_POST(){
    var json = 'https://api.fitbit.com/1/user/-/bp.json';
    _GenerateQueries__StandardPOSTTest('blood-pressure', json);
}
function _GenerateQueries__bloodPressure_DELETE(){
    var json = 'https://api.fitbit.com/1/user/-/bp/123.json';
    _GenerateQueries__StandardDELETETest('blood-pressure', json);
}
function _GenerateQueries__glucose_GET(){
    var json = 'https://api.fitbit.com/1/user/-/glucose/date/2015-06-02.json';
    _GenerateQueries__StandardGETTest('glucose', json);
}
function _GenerateQueries__glucose_POST(){
    var json = 'https://api.fitbit.com/1/user/-/glucose.json';
    _GenerateQueries__StandardPOSTTest('glucose', json);
}
function _GenerateQueries__glucose_DELETE(){
    _GenerateQueries__StandardNotExistTest('glucose','DELETE');
}
function _GenerateQueries__invitations_GET(){
    var json = 'https://api.fitbit.com/1/user/-/friends/invitations.json';
    _GenerateQueries__StandardGETTest('invitations', json);
}
function _GenerateQueries__invitations_POST(){
    var json = 'https://api.fitbit.com/1/user/-/friends/invitations/222.json';
    _GenerateQueries__StandardPOSTTest('invitations', json, true);
}
function _GenerateQueries__invitations_DELETE(){
    _GenerateQueries__StandardNotExistTest('invitations', 'DELETE');
}
function _GenerateQueries__createInvite_POST(){
    var json = 'https://api.fitbit.com/1/user/-/friends/invitations.json';
    _GenerateQueries__StandardPOSTTest('create-invite', json);
}
function _GenerateQueries__friends_GET(){
    var json = 'https://api.fitbit.com/1/user/-/friends.json';
    _GenerateQueries__StandardGETTest('friends', json);
}
function _GenerateQueries__friends_POST(){
    _GenerateQueries__StandardNotExistTest('friends', 'POST');
}
function _GenerateQueries__friends_DELETE(){
    _GenerateQueries__StandardNotExistTest('friends', 'DELETE');
}
function _GenerateQueries__leaderboard_GET(){
    var json = 'https://api.fitbit.com/1/user/-/friends/leaderboard.json';
    _GenerateQueries__StandardGETTest('leaderboard', json);
}
function _GenerateQueries__leaderboard_POST(){
    _GenerateQueries__StandardNotExistTest('leaderboard', 'POST');
}
function _GenerateQueries__leaderboard_DELETE(){
    _GenerateQueries__StandardNotExistTest('leaderboard', 'DELETE');
}
function _GenerateQueries__TimeSeries_GET(){
    var output = 'https://api.fitbit.com/1/user/-/sleep/minutesAsleep/date/2015-03-01/7d.json';
    var value = {
        method: 'GET',
        format: 'json',
        alias: 'time-series',
        category: 'sleep',
        subcategory: 'minutesAsleep',
        date: '2015-03-01',
        timespan: '7d'
    };

    var result = QueryService.create(value);
    expect(result).to.equal(output);

    output = 'https://api.fitbit.com/1/user/-/body/weight/date/2015-03-01/7d.json';
    value.category = 'body';
    value.subcategory = 'weight';
    result = QueryService.create(value);
    expect(result).to.equal(output);
}
function _GenerateQueries__TimeSeries_POST(){
    _GenerateQueries__StandardNotExistTest('time-series', 'POST');
}
function _GenerateQueries__TimeSeries_DELETE(){
    _GenerateQueries__StandardNotExistTest('time-series', 'DELETE');
}
function _GenerateQueries__timeSeries_Get(){

    var value = {
        method: 'GET',
        format: 'json',
        randomVar: 'bla',
        date: '2015-03-02',
        startDate: '2015-03-05',
        endDate: '2015-04-01',
        timespan: '7d',
        category: 'sleep',
        subcategory: 'startTime',
        alias: 'time-series'
    };

    /** It should use start date and end date */
    var getResult = QueryService.create(value);
    var output = 'https://api.fitbit.com/1/user/-/sleep/startTime/date/2015-03-05/2015-04-01.json';
    expect(getResult).to.equal(output);

    /** It should create appropriate category/subcategory relation */
    value.category = 'activities';
    value.subcategory = 'tracker/distance';
    getResult = QueryService.create(value);
    output = 'https://api.fitbit.com/1/user/-/activities/tracker/distance/date/2015-03-05/2015-04-01.json';
    expect(getResult).to.equal(output);

    /** It should use date and timespan if stardate/enddate are not defined */
    value.category = 'sleep';
    value.subcategory = 'startTime';
    delete value.endDate;
    delete value.startDate;
    getResult = QueryService.create(value);
    output = 'https://api.fitbit.com/1/user/-/sleep/startTime/date/2015-03-02/7d.json';
    expect(getResult).to.equal(output);

    /** It should use today's date and 7d as timespan if date and timespan is not defined */
    var d = new Date();
    var yr = d.getUTCFullYear();
    var mo = d.getUTCMonth() + 1;
    if(mo < 10) mo = '0' + mo;
    var da = d.getUTCDate();
    if(da < 10) da = '0' + da;
    var todayDate = yr + '-' + mo + '-' + da;

    delete value.date;
    delete value.timespan;
    getResult = QueryService.create(value);
    output = 'https://api.fitbit.com/1/user/-/sleep/startTime/date/'+todayDate+'/7d.json';
    expect(getResult).to.equal(output);

}


function _GenerateQueries__timeSeries_Get_HandleError(){

    var value = {
        method: 'GET',
        format: 'json',
        randomVar: 'bla',
        date: '2015-03-02',
        startDate: '2015-03-05',
        endDate: '2015-04-01',
        timespan: '7d',
        category: 'sleep',
        subcategory: 'startTime',
        alias: 'time-series'
    };
    /** It should throw if category or subcategory is not defined */
    delete value.subcategory;
    expect(function(){
        QueryService.create(value);
    }).to.throw('Categories are not defined');

    delete value.category;
    value.subcategory = 'weight';
    expect(function(){
        QueryService.create(value);
    }).to.throw('Categories are not defined');

    /** It should throw if category does not exist */
    value.category = 'blaadsfsadf';
    value.subcategory = 'weight';
    expect(function(){
        QueryService.create(value);
    }).to.throw("Invalid category");

    /** It should throw if category and subcategory do not match */
    value.category = 'body';
    value.subcategory = 'sleep';
    expect(function(){
        QueryService.create(value);
    }).to.throw("Category does not match subcategory");

}

function _GenerateQueries__alarm_GET(){
    var json = 'https://api.fitbit.com/1/user/-/devices/tracker/55777/alarms.json';

    var values = {
        alias: 'alarm',
        method: 'GET',
        format: 'json',
        data: {
            id: '55777'
        }
    };
    var result = QueryService.create(values);
    expect(result).to.equal(json);
}

function _GenerateQueries__alarm_POST(){
    var json = 'https://api.fitbit.com/1/user/-/devices/tracker/55777/alarms/123.json';

    var values = {
        alias: 'alarm',
        method: 'POST',
        format: 'json',
        data: {
            deviceId: '55777',
            alarmId: '123'
        }
    };
    var result = QueryService.create(values);
    expect(result).to.equal(json);
}

function _GenerateQueries__alarm_DELETE(){
    var json = 'https://api.fitbit.com/1/user/-/devices/tracker/55777/alarms/123.json';

    var values = {
        alias: 'alarm',
        method: 'DELETE',
        format: 'json',
        data: {
            deviceId: '55777',
            alarmId: '123'
        }
    };
    var result = QueryService.create(values);
    expect(result).to.equal(json);
}

function _GenerateQueries__devices_GET(){
    var json = 'https://api.fitbit.com/1/user/-/devices.json';
    _GenerateQueries__StandardGETTest('devices', json);
}
function _GenerateQueries__device_GET(){
    var json = 'https://api.fitbit.com/1/user/-/devices/345.json';
    _GenerateQueries__StandardGETTest('device', json, false, true);
}
function _GenerateQueries__createAlarm_POST(){
    var json = 'https://api.fitbit.com/1/user/-/devices/tracker/55777/alarms.json';
    var values = {
        alias: 'createAlarm',
        method: 'POST',
        format: 'json',
        data: {
            deviceId: '55777'
        }
    };
    var result = QueryService.create(values);
    expect(result).to.equal(json);
}