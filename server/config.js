'use strict'

/*
  Configuration
*/
var config = {
  "API_AUTH_TOKEN" : "GUEST_BWjr2IYsQ0ynIMfkWbNJcA",
  "API_HOST" : "napi.busbud.com",
  "API_PORT" : 443,
  "SYSTEMS_CONFIG_LOCATION" : "http://jaredsavage.com/projects/impulse/systems/",
  "PORT" : 80
}


//If we have any config values defined by envvars, use them instead.
Object.keys(config).forEach(function(key) { 
  if(typeof process.env[key] !== 'undefined') {
    config[key] = process.env[key];
  }
})

module.exports = exports = config
