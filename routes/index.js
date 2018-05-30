var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
  var options = {
    method: 'GET',
    url: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-08-02',
    headers: {
      'X-Busbud-Token': process.env.BUSBUD_TOKEN;
      //'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('volvió');
      res.type('json');
      res.send(body);
      return;
    }
    res.status(500)
    res.json({ message:'Internal Server Error' })
  }

  request(options, callback);
});

module.exports = router;
