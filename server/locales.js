'use strict'

let fs   = require('fs'),
	path = require('path');
	
this.getLocalizationData = function getLocalizationData(acceptLocales, overrides) {
	
	return new Promise(function(resolve, reject) {
	
		acceptLocales = acceptLocales
			.split(',')
			.map(function(v) {
				return v.indexOf(';') > -1 ? v.split(';')[0] : v;
			})
			
	  //So we are sure that we'll fall back to English if nothing else is available
		if(acceptLocales.indexOf('en') === -1) acceptLocales.push('en')
		
		function returnLocale(locale) {

			let resFile = path.resolve('./server/locales/', locale + '.json');
			
			fs.readFile(resFile, function(err, data) {
				if (err) {
					//We've tried every language we could, and something is very wrong: 'en' should always be available.
					if(acceptLocales.length === 0) {
						console.error(err);
						resolve(err);
					} else {
						//We didn't find resources to match the requested locale, try the next one
						returnLocale(acceptLocales.shift());
					}
				} else {
					//We have a match, return the payload
					let r = {
						strings: JSON.parse(data), 
						locale: locale
					};
					
					if(overrides) {
						//We always start with whatever is in default
						if(overrides['default']) {
							Object.assign(r.strings, overrides['default']);
						}
						//Apply anything set for our other override languages
						if(overrides[locale]) {
							Object.assign(r.strings, overrides[locale]);
						}
					}
					
					if(overrides && overrides[locale]) {
						Object.assign(r.strings, overrides[locale]);
					}
					
					//Check if any of our strings contain references
					Object.keys(r.strings).forEach(function (key) {
						let v = r.strings[key];
						
						var matches = v.match(/\${.+?(?=)\}/g);
						
						if(matches) {
							var rS = v;
							matches
								.forEach(function(value) {
									var refKey = value.substring(2, value.length-1);
									if(r.strings[refKey]) {
										rS = rS.replace(value, r.strings[refKey]);
									}
								})

							if(rS) r.strings[key] = rS;
						}
						
					});
					
					resolve(r);
				}
			});
		}
		
		returnLocale(acceptLocales.shift());
	
	})
	
}