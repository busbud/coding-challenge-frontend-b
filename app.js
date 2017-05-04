/*** DECLARE MODULES TO USE IN THIS APP ***/
var express = require('express')
var lodash = require('lodash')
var Twig = require('twig'), twig = Twig.twig;
var request = require('request');
var app = express()


/*** ACCESS TO STATIC FILES LIKE PICTURES ***/
app.use(express.static('public'))

/*** CALLING API WITH THE SERVER ***/
app.get('/', function (req, res) {

  /*** ACCESS API ***/
  request({
    url: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-29',
    headers: {
      'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A',
      'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
    }
  }, function (err, result) {
    if (err) {
      console.log('erreur!', err.stack);
    }
    else {
      /*** PUT IN TABLES ALL DATA FROM API - JSONIFY ***/
      var data = JSON.parse(result.body);

      /*** DISPLAY API RESULTS ***/
      console.log(data);

if (data.complete)
res.render('index.twig', {
  data : data,
})
else {
request({
  url: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-29/poll/?index',
  headers: {
    'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A',
    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
  }

    res.render('index.twig', {
      data : data,
    })
  })
}

  };
  }
)}

);

app.listen(3000)
