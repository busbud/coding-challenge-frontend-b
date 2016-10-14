'use strict'

let readFile = require(__dirname + '\\readfile.js'),
	config   = require(__dirname + '\\config.json'),
	
	pub = {}, 
	pri = {};
	pri.Cache = {};

pub.getConfig = function getConfig(systemKey) {
	
	return new Promise(function(resolve, reject) {
	
	if(pri.Cache[systemKey]) {
		resolve(pri.Cache[systemKey]);
	} else {
		var resFilePath = config.SYSTEMS_CONFIG_LOCATION + systemKey + "/config.json";
			console.log(resFilePath)
			readFile(resFilePath)
			.then(function(data) {
				try {
					var r = JSON.parse(data);
					r.system = systemKey;
					r.styles = "styles.css";
				} catch(error) {
					console.error(error);
					reject(error);
				}
				
				resolve(pri.Cache[systemKey] = r);
			})
			.catch(function(error) {
				console.error(error);
				reject(error);
			})
		}
	})
	
}

pub.isSystemValid = function CheckSystem(systemKey) {
	return new Promise(function(resolve, reject) {
		if(pri.Cache[systemKey]) {
			resolve(true);
		} else {
			this.getConfig()
				.then(function() {
					resolve(true);
				})
				.catch(function() {
					reject(false);
				})
		}
	})
}

pub.clearCache = function CheckSystem(systemKey) {
	pri.systemConfigCache = {};
}

module.exports = exports = pub;