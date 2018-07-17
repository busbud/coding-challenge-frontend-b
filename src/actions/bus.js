import api from './api/busbud.js';

const ROUTES_FETCH_BEGIN = 'ROUTES_FETCH_BEGIN';
const ROUTES_FETCH_SUCCESS = 'ROUTES_FETCH_SUCCESS';
const ROUTES_FETCH_FAILURE = 'ROUTES_FETCH_FAILURE';
export const actions = { ROUTES_FETCH_BEGIN, ROUTES_FETCH_SUCCESS, ROUTES_FETCH_FAILURE };

const fetchRoutesBegin = () => ({ type: actions.ROUTES_FETCH_BEGIN });
const fetchRoutesSuccess = (routes, isComplete) => ({ type: actions.ROUTES_FETCH_SUCCESS, routes, isComplete });
const fetchRoutesFailure = (error) => ({ type: actions.ROUTES_FETCH_FAILURE, error });

export function getRoutes(origin, destination, outbound_date) {
  return async (dispatch) => {
    dispatch(fetchRoutesBegin());
    try {
      const response = await api.getRoutes(origin, destination, outbound_date);
      const { departures, locations, complete } = response;
      const locationsObj = locations.reduce((acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
      }, {});
      const list = departures.map(d => ({
        id: d.id,
        departure: {
          date: d.departure_time,
          timezone: d.departure_timezone,
          location: locationsObj[d.origin_location_id],
        },
        arrival: {
          date: d.arrival_time,
          timezone: d.arrival_timezone,
          location: locationsObj[d.destination_location_id],
        },
        duration: d.duration,
        price: d.prices.total / 100, // it seems the value is multiplied by 100
        currency: d.currency,
      }));
      dispatch(fetchRoutesSuccess(list, complete));
    } catch (error) {
      dispatch(fetchRoutesFailure(error));
    }
  }
}
