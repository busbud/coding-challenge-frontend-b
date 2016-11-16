
import 'whatwg-fetch'


export function fetchDeparture(origin, destination, date){

        return fetch(`https://napi.busbud.com/x-departures/${origin}/${destination}/${date.toISOString().slice(0, 10)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token': process.env.busbud_token
            }
        });
      }


export function pollDeparture(origin, destination, date){

      }
