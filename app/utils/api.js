var axios = require('axios');

var baseURL = 'https://napi.busbud.com/x-departures/';
var headers = {headers: {
	'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
	'X-Busbud-token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
}};

/**
 * Function to receive query string parameters from URL
 * Returns object for api parameters 
 * split into path and query parameters
 * @param  {Object}
 * @return {Object}
 */
function getQueryStringData(params) {
	return {
		path: {
			origin: params.origin,
			destination: params.destination,
			outboud_date: params.outbound_date
		},
		query: {
			adult: params.adult
		}
	};
}

/**
 * Function that returns path parameters
 * 
 * @param  {Object}
 * @return {String}
 */
function prepPathParameters (pathData) {
	return Object.values(pathData).join('/');
}

/**
 * Function that returns correct format of query string paramters
 * 
 * @param  {Object}
 * @return {String}
 */
function prepQueryParameters (queryData) {
	return Object.keys(queryData)
		.map(function (key) {
			return key + '=' + encodeURIComponent(queryData[key]);
		}).join('&');
}

/**
 * Function that return complete url needed to complete request
 * 
 * @param  {Object}
 * @param  {Boolean}
 * @return {String}
 */
function prepURL (data, poll = false) {
	var pathParams = prepPathParameters(data.path);
	var queryParams = prepQueryParameters(data.query);

	if (poll) {
		return baseURL + pathParams + '/poll?' + queryParams;
	}

	return baseURL + pathParams + '?' + queryParams;
}

/**
 * Function that completed a GET request to busbud API
 * and returns results or errors
 * 
 * @param  {Object}
 * @param  {Boolean}
 * @param  {Integer}
 * @return {Object}
 */
function getDepartures (params, poll, index) {
	var urlParams = getQueryStringData(params);
	var url;

	if (poll) {
		url = prepURL(urlParams, poll) + '&index=' + index;
	} else {
		url = prepURL(urlParams);
	}

	return axios.get(url, headers)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			return error;
		});
}

module.exports = {
	getDepartures: getDepartures
};