// import { toastr } from 'react-redux-toastr';

// Action Types
const LOADING = 'departure/LOADING';
const DEPARTURES = 'departure/DEPARTURES';
const COMPLETE = 'departure/COMPLETE';

const INITIAL_STATE = {
  isLoading: false,
  list: [],
  isComplete: false,
};


// Selectors
export const departuresSelector = state => state.departures.list;
export const isLoadingSelector = state => state.departures.isLoading;
export const isCompleteSelector = state => state.departures.isComplete;

export function loading(isLoading) {
  return {
    type: LOADING,
    payload: isLoading,
  };
}

export function pollDepartures() {
  return (dispatch, getState) => {
    dispatch(loading(true));

    let departures = departuresSelector(getState());
    departures = departures.concat([departures.length, departures.length + 1, departures.length + 2]);

    setTimeout(() => {
      dispatch([
        {
          type: DEPARTURES,
          payload: departures,
        },
        loading(false),
        {
          type: COMPLETE,
          payload: departures.length > 10,
        },
      ]);
    }, 2000);
  };
}

export function initDepartures() {
  return (dispatch) => {
    dispatch(loading(true));

    // let response = await fetchFromServer();
    // let departures = response.departures;

    // dispatch([
    //   { type: DEPARTURES, payload: departures },
    // ]);

    setTimeout(() => {
      dispatch([
        {
          type: DEPARTURES,
          payload: [0, 1, 2],
        },
        loading(false),
      ]);
    }, 1000);

    // apiRequest({
    //   method: 'get',
    //   url: `${baseUrl}/browse/featured-playlists`,
    //   params: getState().filters.filters_query,
    // }).then((resp) => {
    //   dispatch([
    //     {
    //       type: 'PLAYLISTS',
    //       payload: resp.data.playlists,
    //     },
    //     loading(),
    //   ]);
    // }).catch((error) => {
    //   const errorMsg = getErrorMessage(error, 'Erro ao carregar lista de playlists');
    //   console.error(errorMsg, error);
    //   toastr.error('Error', errorMsg);
    //   dispatch([
    //     { type: 'PLAYLISTS', payload: {} },
    //     loading(),
    //   ]);
    // });
  };
}

// Reducers
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case DEPARTURES:
      return { ...state, list: action.payload };
    case LOADING:
      return { ...state, isLoading: action.payload };
    case COMPLETE:
      return { ...state, isComplete: action.payload };
    default:
      return state;
  }
}
