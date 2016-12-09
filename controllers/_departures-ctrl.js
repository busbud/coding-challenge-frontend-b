var request = require('request');

exports.departures = function(req, res, next) {
  _makeApiCall(0, req.query.lang || 'en');

  function _makeApiCall(index, lang) {
    var headers = {
      'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
    }
    var method = 'GET';
    var baseUri = 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-08-04/'
    var uriSuffix = 'poll?adult=1&lang='+lang+'&currency=USD&index='+index;
    if (index === 0) {
      uriSuffix = '?adult=1&lang=en&currency=USD';
    }

    request.get({
      uri: baseUri+uriSuffix,
      headers: headers
    }, function(error, response, body) {
      if(error) console.log(error);

      // recursively call if not complete
      var parsedBody = JSON.parse(body)
      if(!parsedBody.complete) {
        _makeApiCall(index+1, lang);
      } else {
        request.get({
          uri: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-08-04/?adult=1&lang='+lang+'&currency=USD',
          headers: headers
        }, function(error, response, body) {
          res.json(JSON.parse(body));
        });
      }
    });
  }
};
