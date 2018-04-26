export const initializeSearch = (queryParams) => {
  return {
    type: 'INITIALIZE_SEARCH',
    payload: queryParams,
  };
};
export const saveSearchResults = (responseData) => {
  return {
    type: 'SAVE_SEARCH_RESULTS',
    payload: responseData,
  };
};
export const decideIfPollingIsNeeded = (searchIsIncomplete) => {
  if (searchIsIncomplete) {
    return { type: 'POLL_SEARCH' };
  }
  return { type: 'COMPLETE_SEARCH' };
};

export const reportSearchError = () => {};
