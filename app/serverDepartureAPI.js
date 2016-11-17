var fetch = require('node-fetch');
const querystring = require('querystring');


exports.fetchDeparture = function(origin, destination, date, query) {
    return fetch(`https://napi.busbud.com/x-departures/${origin}/${destination}/${date}?${querystring.stringify(query)}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
            'X-Busbud-Token': process.env.BUSBUD_TOKEN
        }
    });
}

exports.pollDeparture = function(origin, destination, date, query) {
    return fetch(`https://napi.busbud.com/x-departures/${origin}/${destination}/${date}/poll?${querystring.stringify(query)}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
            'X-Busbud-Token': process.env.BUSBUD_TOKEN
        }
    });

}
