'use strict'

let pub = {},
    pri = {};
    pri.cache = {}

    pub.set = function set(key, value) {
      pri.cache[String(key)] = value;
    }

    pub.stats = function stats() {
      return Object.keys(pri.cache).length;
    }

    pub.exists = function exists(key) {
      return typeof pri.cache[String(key)] !== 'undefined';
    }

    pub.get = function get(key, value) {
      return pri.cache[String(key)];
    }

    pub.clear = function clear() {
      pri.cache = {};
    }

    pub.checkToClear = function checkToClear() {
      if((new Date()).getHours() === 4) {
        //Clear the cache once per day
        pub.clear()
      }
    }

setInterval(pub.checkToClear, 3600000);

module.exports = exports = pub;