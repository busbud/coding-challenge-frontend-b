import fetch from 'isomorphic-fetch';
import qs from 'qs';
import _ from 'lodash';

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

    console.log('FETCH_API_SUCCESS: json',json, 'params', params, 'queryParams', queryParams);

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
            dispatch(receiveDepartures(params, queryParams, json));

            //if the request is not complete: redispatch with polling status (index)
            if (!json.complete) {
                console.log('json.departures.length',json.departures.length);
                let newQueryParams = Object.assign({}, queryParams, {
                    index: json.departures.length + (queryParams.index || 0) //@TODO: test if the index is correct
                });
                dispatch(fetchApiIfNeeded(params, newQueryParams));
            }
        })
        .catch(error => failFetchingDepartures(params, queryParams, error));
    };
}

function shouldFetchApi(state, params, queryParams) {

    let isExpired = false;//TODO: handle TTL
    //fetch only if the queries have changed or if the TTL expired for the current query
    if (!_.isEqual(state.queryParams, queryParams) || isExpired) {
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
    date: '2016-07-29' //the 29th of July 2016
}, queryParams = getQueryParams()) {

    return (dispatch, getState) => {
        if (shouldFetchApi(getState(), params, queryParams)) {
            return dispatch(fetchApi(params, queryParams));
        }
    };
}


//@TODO: handle lang TOGGLE
