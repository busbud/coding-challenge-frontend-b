import 'whatwg-fetch'
const querystring = require('querystring');


export function fetchDeparture(origin, destination, date, query) {
    return fetch(`x-departures/${origin}/${destination}/${date.toISOString().slice(0, 10)}?${querystring.stringify(query)}`, {
        method: 'GET'
    });

}

export function pollDeparture(origin, destination, date, query, index) {
    query.index = index;
    return fetch(`x-departures/${origin}/${destination}/${date.toISOString().slice(0, 10)}/poll?${querystring.stringify(query)}`, {
        method: 'GET'
    });

}
