var express = require('express');
var router = express.Router();

var querystring = require('querystring');
var request = require('request');
var config  = require('../config.js') 

/* GET */
router.get('/api/:origin/:destination/:outbound_date/:adult/:child/:senior/:lang/:currency/:index/:poll?', function(req, res, next) {
 
  var form = {
    adult : req.params.adult,
    child : req.params.child,
    senior : req.params.senior,
    lang : req.params.lang,
    currency : req.params.currency,
    index : req.params.index
  };

  var formData = querystring.stringify(form);
  var contentLength = formData.length;
  
  request({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': config.headers.accept,
        'X-Busbud-Token': config.headers.x_busbud_token

      },
      uri: config.api_base_path+req.params.origin+'/'+req.params.destination+'/'+req.params.outbound_date,
      body: formData,
      method: 'GET'
    }, function (err, results, body) {
        res.json(JSON.parse(results.body))
    });

});

module.exports = router;
