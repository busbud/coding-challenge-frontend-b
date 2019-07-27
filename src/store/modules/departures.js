// import { toastr } from 'react-redux-toastr';

// Action Types
const LOADING = 'departure/LOADING';
const DEPARTURES = 'departure/DEPARTURES';

const INITIAL_STATE = {
  loading: false,
  list: [],
};

export function loading(loadingValue) {
  return {
    type: LOADING,
    payload: loadingValue,
  };
}

export function getDepartures() {
  return (dispatch) => {
    dispatch(loading(true));

    setTimeout(() => {
      dispatch([
        {
          type: DEPARTURES,
          payload: [1, 2, 3],
        },
        loading(false),
      ]);
    }, 5000);

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
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
