import axios from 'axios';
import urlJoin from 'url-join';
import { SearchCriteria, SearchCriteriaQuery, Schedules } from './interfaces';

const TOKEN_KEY = 'token';

const getToken = async () => {
    try {
        const url = urlJoin('http://localhost:4000', 'api', 'token');
        const { data } = await axios.get(url);
        localStorage.setItem(TOKEN_KEY, data);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getSchedulesData = async (
    search: SearchCriteria,
    pollIndex: number = 0
): Promise<Schedules> => {
    let token;
    if (localStorage.getItem(TOKEN_KEY) === null) {
        token = await getToken();
    } else {
        token = localStorage.getItem(TOKEN_KEY);
    }
    console.log(token);
    try {
        let url = `https://napi.busbud.com/x-departures/${search.origin}/${search.destination}/${search.outbound_date}`;
        let params = {
            adult: search.adult || 0,
            child: search.child || 0,
            senior: search.senior || 0,
            lang: search.lang,
            currency: search.currency || 'CAD',
        } as SearchCriteriaQuery;

        if (pollIndex !== 0) {
            url = urlJoin(url, 'poll');
            params = { ...params, index: pollIndex };
        }
        const { data } = await axios.get(url, {
            headers: {
                Accept:
                    'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token': token,
            },
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
    }
};
