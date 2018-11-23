import actions from './actions';
import ApiClient from '../../apiClient';

const search = (origin, destination, outboundDate) => (dispatch) => {
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
    dispatch(actions.requestSearch());
    return new ApiClient().get(`https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}`, { query: {
            adult: 1,
            child: 0,
            senior: 0,
            lang: 'EN',
            currency: 'CAD'
        }})
        .then(res => res.json(), err => dispatch(actions.receiveSearchResultsFail(err)))
        .then(results => dispatch(actions.receiveSearchResults(results)));
};

const poll = (origin, destination, outboundDate) => (dispatch) => {
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
   
    // TODO Maybe update actions
    dispatch(actions.requestSearch());
    return new ApiClient().get(`https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}/poll`, { query: {
            adult: 1,
            child: 0,
            senior: 0,
            lang: 'EN',
            currency: 'CAD'
        }})
        .then(res => res.json(), err => dispatch(actions.receiveSearchResultsFail(err)))
        .then(results => dispatch(actions.receiveSearchResults(results)));
};

export default {
    search,
    poll,
};
