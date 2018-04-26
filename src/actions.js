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
export const checkIfPollingIsNeeded = () => {
  return {
    type: 'FAKE',
  };
};

export const reportSearchError = () => {};
