"use strict";

/**
 * Query Service is responsible for creating appropriate API query
 **/

var APIModel        = require('./../models/api-model');

var QueryService    = {};

var config          = require('./../config');

var colors          = require('colors');

QueryService.create = _create;

module.exports = QueryService;


/**
 * Create something
 * @param what
 * @param obj
 * @private
 */
function _create(value){

    if(!value.method) throw "Method is not specified.";
    if(!value.format) { value.format = 'json'; }

    var fn;

    switch(value.method){
        case "GET":
        case "POST":
        case "DELETE":
            fn = _create__query;
            break;
        default:
            throw "Invalid Create method type";
    }

    return fn(value);

}

function _create__query(value){
    if(typeof value !== 'object'){
        throw "Get query must be an object";
    }

    if(!value.alias) throw "Invalid alias";
    // user Resource URL
    var query = config.userResourceURL;

    // add user id if it's specified
    query += ( value.userId ? value.userId : '-' ) + '/';


        for(var key in APIModel){

            if(key === _camelCase(value.alias)){
                var dict = APIModel[key][value.method];
                if(!dict) throw "That method, "+value.method+" does not exist for " + value.alias; // that method does not exist

                query += dict.url;

                // if it's a public parameter then get rid of user/-/ or user/2342/ because it's not needed
                if(dict.publicParam === true){
                    query = query.replace(/\/user\/(-|[0-9]+)/,'');
                }

                // Add id to the corresponding placeholder
                if(dict.idPlaceholder){
                    if(!value.data) throw "ID placeholder must be set";
                    dict.idPlaceholder.forEach(function(item){
                        query = query.replace('{{}}', value.data[item]);
                    });
                }

                // if it's a time series object, then add necessary parameter before the date
                if(dict.timeSeries === true) {

                    if (!value.category || !value.subcategory) {
                        throw "Categories are not defined";
                    }

                    // Make sure categories and subcategories match
                    var exists = false;
                    for(var i = 0; i < dict.categories.length; i++){
                        if(dict.categories[i].category === value.category){
                            exists = true;
                            if(dict.categories[i].subcategories.indexOf(value.subcategory) < 0){
                                throw "Category does not match subcategory";
                            }
                        }
                    }
                    if(!exists) throw "Invalid category";

                    // add category and sub-category
                    query += value.category + '/' + value.subcategory + '/date/';

                    // if startDate and endDate are placed, use that over date and timespan
                    if(value.startDate && value.endDate){
                        var start = new Date('2015-03-05');
                        var end = new Date('2015-04-01');
                        if(end < start){
                            throw "End time cannot be less than start time";
                        }
                        query += value.startDate + '/' + value.endDate;

                    } else{
                    // if starDate and endDate are not placed,
                    // then use specified date or today's date
                    // and use a default timespan
                        if(value.date){
                            query += value.date + '/';
                        } else if(value.startDate){
                            query += value.startDate + '/';
                        } else{
                            // use today's date
                            var d = new Date();
                            var yr = d.getUTCFullYear();
                            var mo = d.getUTCMonth() + 1;
                            if(mo < 10) mo = '0' + mo;
                            var da = d.getUTCDate();
                            if(da < 10) da = '0' + da;
                            var todayDate = yr + '-' + mo + '-' + da;
                            query += todayDate + '/';
                        }

                        // add timespan if exists or use default
                        query += value.timespan || '7d';
                    }
                }

                else {
                    // if date is listed, then add that to the parameter
                    if (dict.dateRequired === true) {
                        if (!value.date)
                            value.date = '2015-06-02'; // TODO put today's date
                        // throw "Date is not set!";
                        if (value.date) {
                            query += value.date;
                        }
                    }
                }

                // if it's a delete query, append ID parameter (required for all ID)
                if(value.method === 'DELETE'){
                    if(!dict.idPlaceholder) {
                        if (value.data === undefined || value.data.id === undefined) throw "Delete ID cannot be undefined";
                        query += value.data.id;
                    }
                }
                else if(dict.appendId){
                    // if some odd cases, it needs to append ID for POST calls, the id needs to be defined
                    // and should not collide with appending id for delete method
                    if(value.id === undefined && (!value.data || !value.data.id)){
                        console.log('value',value);
                        throw "ID is required for this call";
                    }
                    // take data.id as precedence over value.id
                    query += (value.data ? value.data.id : value.id) || value.id;
                }

                // append format type (json, xml)
                query += '.' + value.format.toLowerCase();

                // POST queries need to add parameters after extension with ?
                if(dict.dataParams && !dict.appendId){
                    query += '?';
                    var params = value.data;
                    if(!params){
                        console.log(colors.yellow("WARNING - Parameters are not set"));
                    }
                    for(var key in params){
                        query += key + '=' + params[key] + '&';
                    }

                    query = query.substring(0,query.length - 1);
                }

                break;
            }
        }

    return query;
}

/**
 * Change into camel case
 * @param str
 * @returns {XML|string|void}
 * @private
 */
function _camelCase(str){
    return str.replace(/[-_][\D]/g, function(match){
        return match.charAt(1) ? match.charAt(1).toUpperCase() : '';
    });
}
