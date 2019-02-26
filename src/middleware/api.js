import axios from 'axios';
import { API } from '../constants/actionTypes';
import { apiStart, apiEnd, startPolling } from '../actions/apiActions';

axios.defaults.baseURL = 'https://napi.busbud.com/x-departures/';
axios.defaults.headers.common['Accept'] =
  'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/';

const wait = duration =>
  new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });

export const api = ({ getState, dispatch }) => next => async action => {
  next(action);

  if (action.type !== API) {
    return;
  }

  const { url, params, delay, label, onSuccess, onFailure } = action.payload;

  dispatch(apiStart(label));

  if (delay) {
    await wait(delay);
  }

  try {
    const { data } = await axios.request({
      url,
      params,
      method: 'GET',
      headers: { 'X-Busbud-Token': process.env.REACT_APP_API_TOKEN }
    });

    if (!data.complete) {
      dispatch(startPolling(data));
    }

    dispatch(onSuccess(data));
  } catch (error) {
    dispatch(onFailure(error));
  } finally {
    dispatch(apiEnd(label));
  }
};
