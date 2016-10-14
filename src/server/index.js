'use strict';

var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    args       = require('yargs').argv,
    http       = require('http'),
	path       = require('path'),
	https      = require('https'),
    fs         = require('fs'),
	bench      = require(__dirname + '\\bench.js'),
	systems    = require(__dirname + '\\systems.js'),
	locales    = require(__dirname + '\\locales.js'),
	config     = require(__dirname + '\\config.json');

	app.set('port', (args.port || process.env.PORT || 3000));
	app.use('/', express.static(path.join(__dirname, 'public')));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));


	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, X-Requested-With, x-userid, x-hash');
		  
		// intercept OPTIONS method
		if ('OPTIONS' == req.method) {
		  res.sendStatus(200);
		} else {
		  next();
		}
	});
		
	app.get('/departures/:origin/:destination/:date/:poll?/', function(req, res) {
		
		//Get the system from the referring domain, remove the port if it's in there. (localhost:3000, etc)
		let systemKey = req.headers.host.match(".+?(?=:[0-9])")[0];
		
		//Check that we have a system maching this systemKey
		systems
			.isSystemValid(systemKey)
			.then(function() {
				
				let index = parseInt(req.query.index) > 0 || false;

				var options = {
					host: config.API_HOST,
					path: config.API_BASE_PATH +'x-departures/'+ req.params.origin +'/'+ req.params.destination +'/'+ req.params.date+'/'+(index ? 'poll/?index='+index : ''),
					port: config.API_PORT,
					method: "GET",
					headers: {
						"Accept" : "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
						"X-Busbud-Token" : config.API_AUTH_TOKEN
					}
				};
				
				var req2 = (config.API_PORT === 443 ? https : http).request(options, function(httpRes) {
					
					res.status(200);
					res.header('Content-Type', 'application/json');
					
					httpRes.setEncoding('utf8');
					httpRes.on('data', function (chunk) {
						res.write(chunk);
					});
					httpRes.on('end', function() {
					  res.end();
					});
					
				});
				
				req2.on('error', function(error) {
					res.status(500).json({'ErrorMessage' : error.message, error: error});   
				});
				
				req2.end();
				
			})
			.catch(function(error) {
				res.status(500).json({'ErrorMessage' : `Unable to find system: ${systemKey}`}); 
			})
		
	});

	//Used to serve up files under the system config
	app.get('/system/res/:file', function(req, res){
		//Get the system from the referring domain, remove the port if it's in there. (localhost:3000, etc)
		let systemKey = req.headers.host.match(".+?(?=:[0-9])")[0];
		
		let isRemote = config.SYSTEMS_CONFIG_LOCATION.substr(0,4) === 'http'
		
		if(isRemote) {
			res.redirect(config.SYSTEMS_CONFIG_LOCATION + systemKey + '/' + req.params.file);
		} else {
			res.sendFile(path.join(__dirname, 'systems', systemKey, req.params.file));
		}
		
	});
	
	//Clear systems cache
	app.get('/system/reset', function(req, res){
		systems.clearCache()
	});

	//Gets the system config based on the hostname
	app.get('/system/config/:locale?/:systemKey?/', function(req, res) {
		
		//Get the system from the referring domain, remove the port if it's in there. (localhost:3000, etc)
		let systemKey = req.headers.host.match(".+?(?=:[0-9])")[0];
		
		systems
			.getConfig(systemKey)
			.then(function(systemConfig) {
						
				//Generate a list of locales to attempt for.
				let acceptLocales = (req.params.locale ? req.params.locale + ',' : '') + req.headers['accept-language'];
				
				locales
					.getLocalizationData(acceptLocales, systemConfig.i18n)
					.then(function(localizationData) {
						
						if(systemConfig.i18n) {
							delete systemConfig.i18n;
						}
						res.status(200).json(Object.assign({}, localizationData, systemConfig));
						
					})
				
			})
			.catch(function(error) {
				console.log(error);
				res.status(500).json({'ErrorMessage' : `Unable to generate config for ${systemKey}.`, error: error});  
			});

	});	

	app.listen(app.get('port'), function() {
	  console.log('Server started: http://localhost:' + app.get('port') + '/');
	});