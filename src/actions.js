export const initializeSearch = () => {
  return {
    type: 'INITIALIZE_SEARCH',
  };
};
export const saveSearchResults = (responseData) => {
  return {
    type: 'SAVE_SEARCH_RESULTS',
    payload: responseData,
  };
};
export const decideIfPollingIsNeeded = (searchIsComplete) => {
  if (searchIsComplete) {
    return { type: 'COMPLETE_SEARCH' };
  }
  return { type: 'POLL_SEARCH' };
};

export const reportSearchError = () => {
  return {
    type: 'REPORT_SEARCH_ERROR',
  };
};
