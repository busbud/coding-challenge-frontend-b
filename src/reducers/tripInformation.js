import { curry, omit, mergeDeepWith, concat } from 'ramda';

export const processSearchResults = curry((state, searchResults) => {
  const unnecessaryKeys = ['complete', 'ttl', 'is_valid_route'];
  return omit(unnecessaryKeys, mergeDeepWith(concat, state, searchResults));
});

const tripInformation = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SAVE_SEARCH_RESULTS':
      return processSearchResults(state, payload);
    default:
      return state;
  }
};

export default tripInformation;
