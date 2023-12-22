"use strict";

var Config = {};

Config.oauthURL         = "http://www.fitbit.com/oauth/authorize?oauth_token=";

Config.requestTokenURL  = "https://api.fitbit.com/oauth/request_token";

Config.accessTokenURL   = "https://api.fitbit.com/oauth/access_token";

Config.oauthVersion     = "1.0";

Config.encryptionMethod = "HMAC-SHA1";

Config.userResourceURL  = "https://api.fitbit.com/1/user/";

Config.CONSUMER_KEY     = '';

Config.CONSUMER_SECRET  = '';

Config.defaultLocale    = 'en_US';

Config.defaultMetric    = 'METRIC';


module.exports = Config;
