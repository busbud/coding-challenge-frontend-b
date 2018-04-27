import { pick, mergeWith, concat, pipe, map } from 'ramda';
import { renameKeysDeep } from '../renameKeys';
import snakeToCamel from '../caseConversion';

const mapAryElementKeysToCamelCase = (searchResults) => {
  return map(map(renameKeysDeep(snakeToCamel)), searchResults);
};

export const processSearchResults = (state, searchResults) => {
  const desiredKeys = ['locations', 'operators', 'departures'];

  return pipe(
    pick(desiredKeys),
    mapAryElementKeysToCamelCase,
    mergeWith(concat, state),
  )(searchResults);
};

const tripInformation = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SAVE_SEARCH_RESULTS':
      return processSearchResults(state, payload);
    default:
      return state;
  }
};

export default tripInformation;
