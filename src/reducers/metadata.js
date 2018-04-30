const metadata = (state = {}, { type, payload }) => {
  switch (type) {
    case 'INITIALIZE_SEARCH':
      return {
        ...state,
        searchStatus: 'inProgress',
      };
    case 'SAVE_SEARCH_RESULTS':
      return {
        ...state,
        departureCount: state.departureCount + payload.departures.length,
      };
    case 'COMPLETE_SEARCH':
      return {
        ...state,
        searchStatus: 'complete',
      };
    case 'REPORT_SEARCH_ERROR':
      return {
        ...state,
        searchStatus: 'error',
      };
    default:
      return state;
  }
};

export default metadata;
