var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var indexPath = path.join(__dirname, '/../dist/index.html')
var publicPath = express.static(path.join(__dirname, '../dist'))

try {
  require("../env.js");
} catch(error) {
  console.log('Please create an env file');
}

var axios = require('axios');

var app = express();

var instance = axios.create({
  baseURL: 'https://napi.busbud.com',
  timeout: 20000,
  headers: {
    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': process.env.BUSBUD_KEY || ''
  }
});

app.use('/dist', publicPath)

app.get('/', function(req, res) {
  res.sendFile(indexPath);
})

var router = express.Router();              // get an instance of the express Router

app.use('/api', router);

router.get('/x-departures/:origin/:destination/:outbound_date', function(req, res) {
    var params = {
      origin: req.params.origin,
      destination: req.params.destination,
      outboundDate: req.params.outbound_date
    };

    instance.get('/x-departures/' + params.origin + '/' + params.destination + '/' + params.outboundDate,
    {
      params: {
        adult: req.query.adult,
        child: req.query.child,
        senior: req.query.senior,
        lang: req.query.lang,
        currency: req.query.currency
      }
    })
      .then(function(response) {
        res.send( response.data );
      }).catch(function(error) {
        res.send( error );
      });
});

router.get('/x-departures/:origin/:destination/:outbound_date/poll', function(req, res) {

    var params = {
      origin: req.params.origin,
      destination: req.params.destination,
      outboundDate: req.params.outbound_date
    };

    instance.get('/x-departures/' + params.origin + '/' + params.destination + '/' + params.outboundDate + '/poll',
    {
      params: {
        adult: req.query.adult,
        child: req.query.child,
        senior: req.query.senior,
        lang: req.query.lang,
        currency: req.query.currency,
        index: req.query.index
      }
    })
      .then(function(response) {
        res.send( response.data );
      }).catch(function(error) {
        res.send( error );
      });
});

  // Initialize the app.
var server = app.listen(process.env.PORT || 8081, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
