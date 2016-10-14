'use strict'
const fs    = require('fs'),
	  http  = require('http'),
	  https = require('https');

module.exports = exports = function readFile(resFilePath) {
	
	let isLocal = resFilePath.substr(0,4).toLowerCase() !== 'http';
	
	return new Promise(function(resolve, reject) {
		
		if(isLocal) {
			
			fs.readFile(resFilePath, function(error, data) {
				
				if (error) {
					reject(error);
				} else {
					resolve(data);
				}
			
			});
			
		} else {
			
			let isHTTPS = resFilePath.substr(0,5) === 'https';
			
			console.log("isHTTPS" + isHTTPS);
			
			(isHTTPS ? https : http)
				.get(resFilePath)
				.on('response', function (res) {

					let data = '', i = 0;
					
					res.on('data', function (chunk) {
						i++; data += chunk;
					});

					res.on('end', function () {
						resolve(data);
					});
					
					res.on('error', function(error) {
						reject(error);
					});
					
				})
		}
	})
}