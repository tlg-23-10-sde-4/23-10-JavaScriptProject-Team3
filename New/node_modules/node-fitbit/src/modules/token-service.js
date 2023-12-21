"use strict";


var TokenService = {};

var util            = require('util');

var isArray         = util.isArray;


TokenService.find   = _find;

TokenService.add    = _add;


module.exports = TokenService;

/**
 * Find something in array
 * @param byWhat
 * @param value
 * @param array
 * @returns {number} returns the index of position.  -1 if not found, greater than -1 if found
 * @private
 */
function _find(byWhat, value, array){
    if(!byWhat){
        throw "Invalid Find Type";
    }
    if(isArray(array) !== true || array.length < 1) return -1;

    for(var i = 0; i < array.length; i++){
        if(array[i][byWhat] === value){
            return i;
        }
    }
    return -1;
}


/**
 * Add something to array
 * @param value
 * @param array
 * @returns {*} returns existing object if duplicate, returns length if success
 * @private
 */
function _add(value, array){
    if(typeof value !== 'object' || isArray(value)){
        throw "value must be an object";
    }
    for(var i = 0; i < array.length; i++){
        if(array[i].token === value.token || array[i].userId === value.userId){
            return array[i];
        }
    }
    array.push(value);
    return value;
}

/**
 * Remove something from the array
 * @param value
 * @param array
 * @returns {boolean}
 * @private
 */
function _remove(value, array){
    if(typeof value !== 'object' || isArray(value)){
        throw "value must be an object";
    }
    for(var i = 0; i < array.length; i++){
        if(array[i].token === value.token || array[i].userId === value.userId){
            array.splice(i,1);
            return true;
        }
    }
    return false;
}