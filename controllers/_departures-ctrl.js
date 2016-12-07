var request = require('request');

exports.departures = function(req, res, next) {
  var d = new Date(2016,5,29,8,0,0,0).toISOString();
  
  var options = {
    url: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/'+d,
    headers: {
      'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
    }
  };

  request(options, function(error, response, body) {
    if (error) throw error;
    if (response.statusCode !== 200) throw new Error('Error: the server responded with code '+response.statusCode);

    res.json(body);
  });
}