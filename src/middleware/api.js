import { API } from '../constants/actionTypes';
import { apiStart, apiEnd } from '../actions/apiActions';
import { getDepartures } from '../api';

export const api = ({ getState, dispatch }) => next => async action => {
  next(action);

  if (action.type !== API) {
    return;
  }

  const { onSuccess, onFailure, label } = action.payload;

  dispatch(apiStart(label));

  try {
    const data = await getDepartures();
    dispatch(onSuccess(data));
  } catch (error) {
    dispatch(onFailure(error));
  } finally {
    dispatch(apiEnd(label));
  }
};
