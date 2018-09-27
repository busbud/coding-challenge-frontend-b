import axios from 'axios';


const ACCEPT = 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/';
const X_BUSBUD_TOKEN = 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
const HEADERS = {
    'Accept': ACCEPT,
    'X-Busbud-Token': X_BUSBUD_TOKEN
}


// const BASE_URL =`https://napi.busbud.com/x-departures/:${ORIGIN}/:${DESTINATION}/:${DATE}`
const BASE_URL = 'https://napi.busbud.com/x-departures/'

export const FETCH_DATA = 'FETCH_DATA'


export function fetchData(origin, destination, outboundDate) {
    const url = `${BASE_URL}:${origin}/:${destination}/:${outboundDate}`
    const request = axios.get(url, HEADERS)

    return (dispatch) => {
        request.then(({ data }) => {
            dispatch({
                type: FETCH_DATA,
                payload: data
            })
        });
    };

}