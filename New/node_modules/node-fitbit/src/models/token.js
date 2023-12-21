"use strict";


module.exports = function(obj){
    return {
        requestToken: obj.requestToken || null,
        requestSecret: obj.requestSecret || null,
        accessToken: obj.accessToken || null,
        accessTokenSecret: obj.accessTokenSecret || null,
        userId: obj.userId || null
    }
};
