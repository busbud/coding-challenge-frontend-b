const metadata = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SAVE_SEARCH_RESULTS':
      return {
        ...state,
        departureCount: state.departureCount + payload.departures.length,
      };
    case 'REPORT_SEARCH_ERROR':
      return {
        ...state,
        searchError: payload,
      };
    default:
      return state;
  }
};

export default metadata;
