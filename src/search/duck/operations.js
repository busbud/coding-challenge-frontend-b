import actions from './actions';
import ApiClient from '../../apiClient';

const apiClient = new ApiClient();

const getCity = (geoHash) => (dispatch) => {
    dispatch(actions.requestCity());
    return apiClient.get(`https://napi.busbud.com/cities/${geoHash}`)
        .then(
            res => dispatch(actions.receiveCity(res)),
            err => dispatch(actions.receiveCityFail(err))
        );
};

const clearSearchResults = () => (dispatch) => {
    dispatch(actions.clearSearchResults());
}

/*
Path parameters:
    origin : Origin's geohash
    destination : Destination's geohash
    outbound_date : ISO 8601 Outbound departure date

Querystring parameters:
    adult : Number of adults
    child : Number of children
    senior : Number of seniors
    lang : ISO 3166-1 alpha-2 language code
    currency : ISO 4217 currency code
*/
const search = (origin, destination, outboundDate, lang = 'en') => (dispatch) => {
    dispatch(actions.requestSearch());
    return apiClient.get(`https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}`, { query: {
            adult: 1,
            child: 0,
            senior: 0,
            lang,
            currency: 'CAD'
        }})
        .then(
            res => dispatch(actions.receiveSearchResults(res)),
            err => dispatch(actions.receiveSearchResultsFail(err))
        );
};

/*
Path parameters:
    origin : Origin's geohash
    destination : Destination's geohash
    outbound_date : ISO 8601 Outbound departure date

Querystring parameters:
    adult : Number of adults
    child : Number of children
    senior : Number of seniors
    lang : ISO 3166-1 alpha-2 language code
    currency : ISO 4217 currency code
    index : Index from which to return new departures, generally set to the total number of departures received since the initial search
*/
const poll = (origin, destination, outboundDate, index, lang = 'en') => (dispatch) => {
    // TODO Maybe update actions
    dispatch(actions.requestSearch());
    return apiClient.get(`https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}/poll`, { query: {
            adult: 1,
            child: 0,
            senior: 0,
            lang,
            currency: 'CAD',
            index,
        }})
        .then(
            res => dispatch(actions.receiveSearchResults(res)),
            err => dispatch(actions.receiveSearchResultsFail(err))
        );
};

export default {
    getCity,
    clearSearchResults,
    search,
    poll,
};
