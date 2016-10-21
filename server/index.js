'use strict'

let express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    args        = require('yargs').argv,
    http        = require('http'),
    path        = require('path'),
    https       = require('https'),
    queryString = require('querystring'),
    fs          = require('fs'),
    cache       = require('./cache.js'),
    bench       = require('./bench.js'),
    systems     = require('./systems.js'),
    config      = require('./config.js');
  
  app.set('port', config.PORT || 80);
  app.use('/', express.static(path.resolve(__dirname, '../public')));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

    //intercept OPTIONS method
    app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, X-Requested-With, X-Busbud-Token, Accept');

    if ('OPTIONS' == req.method) {
      res.sendStatus(200)
    } else {
      next()
    }

  });

  //Wrapping API to prevent public access, so as to keep the token secret.
  //Relying on systemKey whitelist for 'security'
  //TODO : add configuration option to allow setting the endpoint for direct client access
  app.get('/x-departures/:origin/:destination/:date/:poll?', function(req, res) {

    //Check that we have a system maching this systemKey
    systems
      .isSystemValid(req.headers.host)
      .then(function() {

      //Intercept, set the required headers, forward the request
        let options = {
          host: config.API_HOST,
          path: req.originalUrl,
          port: config.API_PORT,
          method: "GET",
          headers: {
            "accept" : "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
            "x-busbud-token" : config.API_AUTH_TOKEN
          }
        }

        let apiRequest = (config.API_PORT === 443 ? https : http).request(options, function(apiResponse) {

          apiResponse.setEncoding('utf8');
          
          res.header('Content-Type', 'application/json');

          apiResponse.on('data', function (chunk) {
            res.write(chunk);
          });

          apiResponse.on('error', function (error) {
            res.status(500).json({'ErrorMessage' : error.message, error: error});   
          });
          
          apiResponse.on('end', function() {
            res.status(200);
            res.end();
          });
          
        });
        
        apiRequest.on('error', function(error) {
          console.log(error);
          res.status(500).json({'ErrorMessage' : error.message, error: error});   
        });
        
        apiRequest.end();
        
      })
      .catch(function(error) {
        res.status(500).json({'ErrorMessage' : `Unable to find system: ${systemKey}`}); 
      })
    
  });

  //Used to serve up files under the system config
  app.get('/system/res/:file', function(req, res) {

    //Get the system from the referring domain
    let systemKey   = systems.cleanSystemKey(req.headers.host),
        isRemote    = config.SYSTEMS_CONFIG_LOCATION.substr(0,4) === 'http',
        resFileName = req.params.file;
    
    if(isRemote) {
      res.redirect(config.SYSTEMS_CONFIG_LOCATION + systemKey + '/' + resFileName);
    } else {
      res.sendFile(path.join(__dirname, 'systems', systemKey, resFileName));
    }
    
  });
  
  //Clear systems cache
  app.get('/system/reset', function(req, res) {
    cache.clear();
    res.status(200).json({Status: 'Cache cleared'});
  });

  //Gets the system config based on the hostname
  app.get('/system/config/', function(req, res) {
    
    systems
      .getLocalizedConfig(req.headers.host, req.headers['accept-language'])
      .then(function(systemConfig) {
        res.status(200).json(systemConfig);
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).json({'ErrorMessage' : `Unable to generate config for ${systemKey}.`, error: error});  
      });

  }); 

  app.listen(app.get('port'), function() {
    console.log('Server started: ' + app.get('port') + '/');
    console.log('Running config:');
    console.log(config);
  });