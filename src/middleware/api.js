import axios from 'axios';
import { API } from '../constants/actionTypes';
import { apiStart, apiEnd, updateDepartures } from '../actions/apiActions';

axios.defaults.baseURL = 'https://napi.busbud.com/x-departures/';
axios.defaults.headers.common['Accept'] =
  'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/';

function delay(duration) {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });
}

const poll = async (index, dispatch) => {
  await delay(2000);
  const { data } = await axios.request({
    method: 'GET',
    url: `dr5reg/f25dvk/2019-09-27/poll`,
    headers: { 'X-Busbud-Token': process.env.REACT_APP_API_TOKEN },
    params: {
      adult: 1,
      child: 0,
      senior: 0,
      lang: 'us',
      currency: 'usd',
      index
    }
  });

  if (data.departures.length > 0) {
    dispatch(updateDepartures(data));
  }

  if (!data.complete) {
    await poll(data.departures.length, dispatch);
  }
};

export const api = ({ getState, dispatch }) => next => async action => {
  next(action);

  if (action.type !== API) {
    return;
  }

  const { onSuccess, onFailure, label } = action.payload;

  dispatch(apiStart(label));

  try {
    const { data } = await axios.request({
      method: 'GET',
      url: `dr5reg/f25dvk/2019-09-27`,
      headers: { 'X-Busbud-Token': process.env.REACT_APP_API_TOKEN },
      params: {
        adult: 1,
        child: 0,
        senior: 0,
        lang: 'us',
        currency: 'usd'
      }
    });

    if (!data.complete) {
      poll(data.departures.length, dispatch);
    }

    dispatch(onSuccess(data));
  } catch (error) {
    dispatch(onFailure(error));
  } finally {
    dispatch(apiEnd(label));
  }
};
