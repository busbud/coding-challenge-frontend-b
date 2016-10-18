'use strict'

let readFile = require('./readfile.js'),
	  config   = require('./config.js'),
	  locales  = require('./locales.js'),
	  cache    = require('./cache.js'),
	
	  pub = {}, 
	  pri = {};

pub.getConfig = function getConfig(systemKey) {
	


	systemKey = pub.cleanSystemKey(systemKey);
	
	return new Promise(function(resolve, reject) {
		
		if(cache.exists(systemKey)) {

			resolve(cache.get(systemKey));
			
		} else {

			let resFilePath = config.SYSTEMS_CONFIG_LOCATION + systemKey + "/config.json";
			
			readFile(resFilePath)
				.then(function(data) {
					try {

						let systemConfig = JSON.parse(data);
							  systemConfig.systemKey = systemKey;
						
						    cache.set(systemKey, systemConfig);
						    resolve(systemConfig);
						
					} catch(error) {
						console.error(error);
						reject(error);
					}
				})
				.catch(function(error) {
					console.error(error);
					reject(error);
				})
		}
	})
}

pub.getLocalizedConfig = function getConfig(systemKey, acceptLocales) {
	
	return new Promise(function(resolve, reject) {
		
		systemKey = pub.cleanSystemKey(systemKey);
		
		let cacheKey = "getLocalizedConfig"+systemKey+acceptLocales;
		
		if(cache.exists(cacheKey)) {

			resolve(cache.get(cacheKey));

		} else {

			pub
				.getConfig(systemKey, acceptLocales)
				.then(function(systemConfig) {

					locales
						.getLocalizationData(acceptLocales, systemConfig.locales)
						.then(function(localizationData) {
							
							let r = JSON.parse(JSON.stringify(systemConfig));

							if(r.locales) delete r.locales;

							Object.assign(r, localizationData);

							cache.set(cacheKey, r);
							
							resolve(r);
						})

				})
				.catch(function(error) {
					console.error(error);
					res.status(500).json({'ErrorMessage' : `Unable to generate config for ${systemKey}.`, error: error});  
				});

		}
	})
}

//Scrubs the port number off, if one was passed in
pub.cleanSystemKey = function hostToSystemKey(host) {
	return( host.match(/:/g) ) ? host.slice( 0, host.indexOf(":") ) : host
}

pub.isSystemValid = function CheckSystem(systemKey) {

	systemKey = pub.cleanSystemKey(systemKey);
	
	return new Promise(function(resolve, reject) {
		if(cache.exists(systemKey)) {
			resolve(true);
		} else {
			pub
				.getConfig(systemKey)
				.then(function() {
					resolve(true);
				})
				.catch(function() {
					reject(false);
				})
		}
	})
}

module.exports = exports = pub;