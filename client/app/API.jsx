import $      from 'jquery';
import moment from 'moment';

let API = {

	currency: 'USD',
	
	setConfig: function setConfig(op) {
		op = op || {};
		if(op.locale) this.locale = op.locale;
		if(op.currency) this.currency = op.currency;
		this.fetchDepartures = this.fetchDepartures.bind(this);
		return this;
	},

	fetchConfig: function fetchConfig() {
		return $.get({
			url: '/system/config/',
			headers: API.locale ? { 'accept-language' : API.locale } : {}
		});
	},

	fetchDepartures: function fetchDepartures(op) {

		return new Promise(function(resolve, reject) {

			op = op || {};
			let r = {operators: {}, departures: [], locations: {}, cities: {}};

			var innerFetchDepartures = function() {

				let qURL = [
						'/x-departures',
						op.origin,
						op.destination,
						op.departureDate,
						((typeof op.pollIndex !== 'undefined') ? 'poll' : '')
					].join('/')
					
				let qData = {
					currency: API.currency,
					lang: API.locale.substr(0,2)
				}

				if(typeof op.pollIndex !== 'undefined') qData.index = op.pollIndex;
				
				let qHeaders = {}
				if(API.locale) qHeaders['accept-language'] = API.locale;

				$.get({
					url: qURL, 
					data : qData,
					headers: qHeaders
				}).then(function(result) {
				
					//Map the arrays of locations, cities, operators onto an object by id so they're easier to reference.
					function appendToResultsBank(key, indexAttr) {
						if(result[key]) {
							result[key].forEach(function(o) {
								if(typeof r[key][o[indexAttr]] === "undefined") r[key][o[indexAttr]] = Object.assign({},o);
							})
						}
					}

					appendToResultsBank('operators','id');
					appendToResultsBank('cities','id');
					appendToResultsBank('locations','id');

					if(!!result.departures && result.departures.length > 0) {

						//Some property mapping to make it easier to consume later
						result.departures.forEach(function(d) {
							Object.assign(d, {
								departure_display_time    : moment(d.departure_time).locale(API.locale).format('LT'),
								arrival_display_time      : moment(d.arrival_time).locale(API.locale).format('LT'),
								origin_location_name      : r.locations[d.origin_location_id].name,
								destination_location_name : r.locations[d.destination_location_id].name,
								operator_display_name     : r.operators[d.operator_id].display_name,
								operator_logo             : r.operators[d.operator_id].logo_url
							})
						}.bind(this))
						
						//All the mapping
						r.destination_city_id = result.destination_city_id
						r.origin_city_id      = result.origin_city_id
						r.departures          = r.departures.concat(result.departures)
						r.destination_city_id = result.destination_city_id
						r.destination_city_id = result.destination_city_id

					}

					if(result.complete) {

						//Saw ths happen a few times. Complete, but no results.
						if(!!r.departures && r.departures.length === 0) {
							reject({error:'No results found'});
						} else {
							r.ttl = result.ttl;
							resolve(r);
						}


					} else if(!!op.pollIndex && op.pollIndex > 15) {
						
						if(r.departures.length > 0) {
							resolve(r);
						} else {
							reject({error:'No results found'});
						}
						
					} else {
						
						if(typeof op.pollIndex === 'undefined') { op.pollIndex = 0 } else { op.pollIndex++ };
						setTimeout(innerFetchDepartures.bind(this),1000) //seems like if we poll too quickly, the server gets grumpy
						
					}
					
				}.bind(this));
			}.bind(this);

			innerFetchDepartures();

		}.bind(this))
		
	}
}

export default API;