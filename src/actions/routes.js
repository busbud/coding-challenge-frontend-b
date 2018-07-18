import api from './api/busbud.js';

const ROUTES_FETCH_BEGIN = 'ROUTES_FETCH_BEGIN';
const ROUTES_FETCH_ADD = 'ROUTES_FETCH_ADD';
const ROUTES_FETCH_SUCCESS = 'ROUTES_FETCH_SUCCESS';
const ROUTES_FETCH_FAILURE = 'ROUTES_FETCH_FAILURE';
export const actions = { ROUTES_FETCH_BEGIN, ROUTES_FETCH_ADD, ROUTES_FETCH_SUCCESS, ROUTES_FETCH_FAILURE, };

const fetchRoutesBegin = () => ({ type: actions.ROUTES_FETCH_BEGIN });
const fetchRoutesAdd = (routes) => ({ type: actions.ROUTES_FETCH_ADD, routes });
const fetchRoutesSuccess = () => ({ type: actions.ROUTES_FETCH_SUCCESS });
const fetchRoutesFailure = (error) => ({ type: actions.ROUTES_FETCH_FAILURE, error });

const parseDepartures = (list, locations) => (list.map(d => ({
  id: d.id,
  departure: {
    date: d.departure_time,
    timezone: d.departure_timezone,
    location: locations[d.origin_location_id],
  },
  arrival: {
    date: d.arrival_time,
    timezone: d.arrival_timezone,
    location: locations[d.destination_location_id],
  },
  duration: d.duration,
  price: d.prices.total / 100, // it seems the value is multiplied by 100
  currency: d.currency,
})));

/* Makes get O(1) for a price of O(n) once */
const parseLocations = locations => (locations.reduce((acc, curr) => {
  acc[curr.id] = curr.name;
  return acc;
}, {}));


export function getRoutes(origin, destination, outbound_date) {
    return async (dispatch) => {
    dispatch(fetchRoutesBegin());
    try {
      const { departures, locations, complete } = await api.getRoutes(origin, destination, outbound_date);
      dispatch(fetchRoutesAdd(parseDepartures(departures, parseLocations(locations))));

      let offset = departures.length;
      let isComplete = complete;

      // maybe not the best strategy using a while
      // but it will stop in case of an error
      // here we are polling like crazy, a future version could have a setTimeout
      while (!isComplete) {
        const { departures: pollDepartures, locations: pollLocations, complete: pollComplete } =
          await api.pollRoutes(origin, destination, outbound_date, offset);
        dispatch(fetchRoutesAdd(parseDepartures(pollDepartures, parseLocations(pollLocations))));
        offset += pollDepartures.length;
        isComplete = pollComplete;
      }
      dispatch(fetchRoutesSuccess());
    } catch (apiError) {
      let error;
      if (apiError.error && apiError.error.details && apiError.error.details.indexOf('date_in_the_past') !== -1) {
        error = new Error('pastDate');
      } else {
        error = new Error('unknown')
      }
      dispatch(fetchRoutesFailure(error));
    }
  }
}
