import fetch from 'isomorphic-fetch';
import qs from 'qs';
import { isEqual, isUndefined } from 'lodash';

/**
 * toggleLang action
 **/
export const toggleLang = (lang) => {
    return {
        type: 'TOGGLE_LANG',
        lang: lang
    };
};


/**
 * toggleCurrency action
 **/
export const toggleCurrency = (currency) => {
    return {
        type: 'TOGGLE_CURRENCY',
        currency: currency
    };
};


/**
 * changeSort action
 **/
export const sortTypes = ['departureDate', 'price', 'company'];
export const changeSort = (sort) => {
    return {
        type: 'CHANGE_SORT',
        sort: sort
    };
};





/**
 *  Api actions
 **/


function fetchDepartures(params, queryParams) {
    return {
        type: 'FETCH_API_REQUEST',
        params: params,
        queryParams: queryParams
    };
}

function receiveDepartures(params, queryParams, json) { 
    return {
        type: 'FETCH_API_SUCCESS',
        params: params,
        queryParams: queryParams,
        json: json
    };
}

function failFetchingDepartures(params, queryParams, error) {
    return {
        type: 'FETCH_API_FAILURE',
        params: params,
        queryParams: queryParams,
        error: error
    };
}

let refresher;
export function createRefresher(ttl, dispatch) {
    //wait the ttl then redispatch (to keep list up-to-date)
    if (!refresher && ttl && ttl > 0) {

        const diffInMs = Math.ceil(ttl)*1000;
        refresher = setTimeout(() => {
            dispatch(fetchApiIfNeeded());
            //reset the timer
            clearTimeout(refresher);
            refresher = null;
        }, diffInMs + 1000);//Add 1 second to ensure the new data will def. be available
    }
}

/**
 *  fetchApi() : do the actual api request
 **/

function fetchApi(params, queryParams) {

    let isPoll = queryParams.hasOwnProperty('index');

    return dispatch => {
        dispatch(fetchDepartures(params, queryParams));
        return fetch(
                `https://napi.busbud.com/x-departures/${params.NY}/${params.MTL}/${params.date}${isPoll ? '/poll' : ''}?${qs.stringify(queryParams)}`,
                {
                    headers: {
                        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
                    }
                }
            )
        .then((response) => response.json())
        .then((json) => {

            //calculate the expiration date from the TTL (assuming TTL is in seconds)
            if (json && json.ttl) {

                let diffInMs = Math.ceil(json.ttl)*1000;
                json.expireDate = new Date(diffInMs + (+new Date()));

                //ceate a refresher to make sure we always have up-to-date data
                createRefresher(json.ttl, dispatch);
            }

            //wait a little bit before redispatching: 
            //for some reason, fetch() stop querying the server after ~10 consecutive tries.
            //since the poll takes sometime more time to complete the list of departures,
            //we're applying a light delay between requests:
            setTimeout(() => {
                dispatch(receiveDepartures(params, queryParams, json));

                //if the request is not complete: redispatch with polling status (index)
                if (!json.complete) {
                    let newQueryParams = Object.assign({}, queryParams, {
                        index: json.departures.length + (queryParams.index || 0)
                    });
                    
                    dispatch(fetchApiIfNeeded(params, newQueryParams));
                }
            }, json.complete ? 1 : 1000);//I know this is bad, but I can't do any other way (poor documentation of the fetch() wrapper...)
        })
        .catch(error => failFetchingDepartures(params, queryParams, error));
    };
}

function shouldFetchApi(state, params, queryParams) {

    //determine if the data is expired by comparing the previously stored property expireDate (Date) to now.
    let isExpired = !(state.api && state.api.data && state.api.data.expireDate) || new Date(state.api.data.expireDate) < new Date();

    //fetch only if the queries have changed or if the TTL expired for the current query
    if (isEqual(state.api.lang, queryParams.lang) ||
        !isEqual(state.api.currency, queryParams.currency) ||
        !isUndefined(queryParams.index) ||
        (isExpired && !state.api.isFetching)) {

        return true;
    }
    return false;
}

/**
 *  getQueryParams(): get the query params object, based on the proper parameters
 *  index must be set only if the 'complete' property is not true
 **/
export function getQueryParams(lang = 'EN', currency = 'CAD', index = null) {
    let queryParams = {
        adult : 1,
        child : 0,
        senior : 0,
        lang : lang,
        currency : currency
    };

    if (typeof index === 'number') {
        queryParams.index = index;
    }

    return queryParams;
}

export function fetchApiIfNeeded(params = {
    NY: 'dr5reg', //New York geohash
    MTL: 'f25dvk', //Montreal geohash
    date: '2016-08-29' //the 29th of July 2016
}, queryParams = getQueryParams()) {

    return (dispatch, getState) => {
        if (shouldFetchApi(getState(), params, queryParams)) {
            return dispatch(fetchApi(params, queryParams));
        }
    };
}
