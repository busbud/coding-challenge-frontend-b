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
      const { list, complete } = response.data;
      dispatch(fetchRoutesSuccess(list, complete));
    } catch (error) {
      dispatch(fetchRoutesFailure(error));
    }
  }
}
