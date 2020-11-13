import { useReducer, useCallback } from 'react';
import axios from 'axios';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

// Request status handler
const requestStateReducer = (currentState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
      };
    case 'RESPONSE':
      return {
        ...currentState,
        loading: false,
        data: action.responseData,
      };
    case 'ERROR':
      return { ...currentState, loading: false, error: action.error };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not be reached! in apiHook');
  }
};

// Rest Apis handler hook
const useApi = () => {
  const [requestState, dispatchRequest] = useReducer(
    requestStateReducer,
    initialState
  );

  // Reset Reducer
  const clear = useCallback(() => dispatchRequest({ type: 'CLEAR' }), []);

  // Api handler
  const sendRequest = useCallback(
    (url = '', method = '', queries = {}, headers = {}, body = null) => {
      dispatchRequest({ type: 'SEND' });
      axios({
        method,
        url,
        params: queries,
        headers,
        data: body,
      })
        .then((res) => {
          dispatchRequest({
            type: 'RESPONSE',
            responseData: res.data,
          });
        })
        .catch((err) => {
          dispatchRequest({ type: 'ERROR', error: err });
        });
    },
    []
  );

  return {
    isLoading: requestState.loading,
    data: requestState.data,
    error: requestState.error,
    sendRequest,
    clear,
  };
};

export default useApi;
