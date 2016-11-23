var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var indexPath = path.join(__dirname, '/../dist/index.html')
var publicPath = express.static(path.join(__dirname, '../dist'))


require("../env.js");

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

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Pass to next layer of middleware
    next();
});



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
      adult: req.query.adult,
      child: req.query.child,
      senior: req.query.senior,
      lang: req.query.lang,
      currency: req.query.currency
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
      adult: req.query.adult,
      child: req.query.child,
      senior: req.query.senior,
      lang: req.query.lang,
      currency: req.query.currency,
      index: req.query.index
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
