var express = require('express');
var router = express.Router();
var Request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
  Request.get({
    'headers': {
      'content-type': 'application/json',
      'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
    },
    'url': 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-10-01',
    qs: {
      adult: 1,
      child: 0,
      senior: 0,
      currency: 'EUR'
    }
  }, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }

    var firstResponse = JSON.parse(body);

    Request.get({
      'headers': {
        'content-type': 'application/json',
        'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
      },
      'url': 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-10-01/poll',
      qs: {
        adult: 1,
        child: 0,
        senior: 0,
        currency: 'EUR'
      }
    }, (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
      
      var secondResponse = JSON.parse(body);
      firstResponse.departures.push(secondResponse.departures);
      firstResponse.operators.push(secondResponse.operators);

      var departuresJson = firstResponse.departures;
      var locationsJson = firstResponse.locations;
      var operatorsJson = firstResponse.operators;

      res.render('index', {
        title: 'Home',
        departures: departuresJson,
        locations: locationsJson,
        operators: operatorsJson
      });

    });
   
  });
  
});

module.exports = router;
