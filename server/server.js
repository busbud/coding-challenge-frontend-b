var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
require("../env.js");

var axios = require('axios');
var app = express();

console.log(process.env);

var instance = axios.create({
  baseURL: 'https://napi.busbud.com',
  timeout: 1000,
  headers: {
    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': process.env.BUSBUD_KEY || ''
  }
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var router = express.Router();              // get an instance of the express Router

app.use('/api', router);

router.get('/', function(req, res) {
    instance.get('/x-departures/dr5reg/f25dvk/2017-08-03',
    {
      adult: 1,
      child: 0,
      senior: 0,
      lang: 'en',
      currency: 'CAD'
    })
      .then(function(response) {
        res.send( response.data);
      }).catch(function(error) {
        // console.log(error);
        res.send( error );
        // res.json({ error });
      });
});



  // Initialize the app.
var server = app.listen(process.env.PORT || 8081, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
