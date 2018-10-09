
import axios from 'axios';

const host = 'https://napi.busbud.com';

const apiUrl = (origin, destination, date) => {
    return `${host}/x-departures/${origin}/${destination}/${date}`
}

const pollUrl = (origin, destination, date) => {
    return `${host}/x-departures/${origin}/${destination}/${date}/poll`
}

export const apiFetch = ({ origin, destination, date }, isPoll = false, params = {}) => {
    const url = isPoll ? pollUrl(origin, destination, date) : apiUrl(origin, destination, date);
    return axios.get(url, {
        headers: {
            Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
            'X-Busbud-Token': process.env.REACT_APP_BUSBUD_API_TOKEN
        },
        params: params
    }).then(o => o.data)
};
