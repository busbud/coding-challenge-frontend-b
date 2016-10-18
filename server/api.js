/*

TODO: Finish this module, and move the api call stuff into it, instead of having it in index

const https           = require('https'),
      http            = require('http'),
	    Q               = require('q'),
	    _               = require('underscore');
	  
	var pub           = {},
		globalHeaders = {},
		endPointMap   = {};
	
	pub.setHeaders = function(inHeaders) {
		Object
		.keys(inHeaders)
		.forEach(function(v) {
			if(typeof inHeaders[v] === "string") {
				globalHeaders[v] = inHeaders[v];
			}
		})
	}
	
	pub.addEndPoints = function(endPoints) {
		_.each(endPoints, function(v,k) {
			if(typeof v === "string") {
				endPointMap[v] = v;
			}
		})
	}
	
	var Call = function Call(verb, url, parameters, headers) {
		
		if(typeof endPointMap[url] !== "undefined") url = endPointMap[url];
		var deferred = Q.defer();
		var isHTTPS = url.indexOf('https') !== -1;
		var options = {
			host:   url,
			port:   isHTTPS ? 433 : 80,
			method: verb,
			headers: _.extend(globalHeaders, headers)
		};
		
		return (isHTTPS ? https : http).request(options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				console.log('BODY: ' + chunk);
			});
		});
		
	}
	
	['get','post','put','delete'].forEach(function(action) {
		console.log('action')
		pub[action] = function(url, parameters, headers) {
			return Call(action, url, parameters, headers);
		}
	})
	
module.exports = exports = pub;

*/