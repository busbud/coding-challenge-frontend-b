
import 'whatwg-fetch'
const querystring = require('querystring');


export function fetchDeparture(origin, destination, date, query){
        return fetch(`https://napi.busbud.com/x-departures/${origin}/${destination}/${date.toISOString().slice(0, 10)}?${querystring.stringify(query)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token': ''
            }
        });
      }


export function pollDeparture(origin, destination, date, query, index){
  query.index =index;
  return fetch(`https://napi.busbud.com/x-departures/${origin}/${destination}/${date.toISOString().slice(0, 10)}/poll?${querystring.stringify(query)}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
          'X-Busbud-Token': ''
      }
  });

      }
