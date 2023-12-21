"use strict";

/**
 * Fitbit Authentication Module
 */

var OAuth   = require("oauth").OAuth;

var Promise = require('bluebird');

var config  = require('./../config');


var FitbitApiClient = {};


    FitbitApiClient.resetKeys = function(keys){
        if(!keys.CONSUMER_KEY || !keys.CONSUMER_SECRET){
            throw "KEys are not set";
        }
        FitbitApiClient.oauth = new OAuth(
            config.requestTokenURL,
            config.accessTokenURL,
            keys.CONSUMER_KEY,
            keys.CONSUMER_SECRET,
            config.oauthVersion,
            null,
            config.encryptionMethod
        );
    };

    /**
     * Set up OAuth parameters from config
     * @type {OAuth}
     */
    console.log('FitbitClient INIT');
    FitbitApiClient.oauth = new OAuth(
        config.requestTokenURL,
        config.accessTokenURL,
        config.CONSUMER_KEY,
        config.CONSUMER_SECRET,
        config.oauthVersion,
        null,
        config.encryptionMethod
    );

    /**
     * Get Request Token
     *
     * Note: When this promise is resolved with a request token,
     * forward the user to the Fitbit site
     * (e.g., http://www.fitbit.com/oauth/authorize?oauth_token=)
     * for authentication.
     *
     * @returns {Promise}
     */

    FitbitApiClient.getRequestToken = function() {
        var that = this;
        return new Promise(function(resolve, reject){
            that.oauth.getOAuthRequestToken(that._standardCallback);
        });
    };

    /**
     * Get Access Token
     *
     * Note: After the user authorizes with Fitbit, he/she will be forwarded to the URL
     * you specify in your Fitbit API application settings, and the requestToken and
     * verifier will be in the URL. Use these, along with the requestTokenSecret you received
     * above to request an access token in order to make API calls.
     *
     * @param requestToken
     * @param requestTokenSecret
     * @param verifier
     * @returns {Promise}
     */

    FitbitApiClient.getAccessToken = function(requestToken, requestTokenSecret, verifier) {
        var that = this;
        return new Promise(function(resolve, reject) {
            that.oauth.getOAuthAccessToken(requestToken, requestTokenSecret, verifier, that._standardCallback);
        });
    };

    /**
     * Request Resource
     * Example: https://github.com/lukasolson/fitbit-node/blob/master/example.js
     *
     * @param path
     * @param method
     * @param accessToken
     * @param accessTokenSecret
     * @param userId
     * @returns {Promise}
     *
     */
    FitbitApiClient.requestResource = function(url, method, accessToken, accessTokenSecret, userId) {
        var that = this;
        return new Promise(function(resolve, reject) {
            if(!url || !method || !accessToken || !accessTokenSecret){
                return reject("Client::requestResource => Invalid Parameters");
            }
            that.oauth.getProtectedResource(url, method, accessToken, accessTokenSecret, function(err, data, response){
                if(err || response.statusCode == '429'){
                    return reject(err);
                }
                var json;
                try{
                    json = JSON.parse(data);
                }catch(err){
                    console.log('JSON PARSE err',err);
                    json = data;
                }
                resolve(json);
            });
        });
    };


module.exports = FitbitApiClient;