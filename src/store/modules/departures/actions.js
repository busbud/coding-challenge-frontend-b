import { toastr } from 'react-redux-toastr';
import { I18n } from 'react-redux-i18n';

import { departuresSelector, filtersSelector, indexSelector } from './selectors';
import localeSelector from '../i18nSelectors';
import { getDeparturesSearchRequest } from '../../../utils/apiUtilities';

// Action Types
export const LOADING = 'departure/LOADING';
export const DEPARTURES = 'departure/DEPARTURES';
export const COMPLETE = 'departure/COMPLETE';

const locationsCache = {};
const citiesNamesCache = {};

// Helpers

/**
 * Saves all locations to a cache
 * It`s not optmized, but it's not clear if a location will be resent
 * from the server.
 */
function parseDepartures(data) {
  const { departures, locations, cities } = data;

  locations.forEach((location) => {
    locationsCache[location.id] = location;
  });

  cities.forEach((city) => {
    citiesNamesCache[city.id] = city.name;
  });

  return departures.map((departure) => {
    const originLocation = locationsCache[departure.origin_location_id];
    const arrivalLocation = locationsCache[departure.destination_location_id];

    return {
      ...departure,
      originLocationName: originLocation.name,
      destinationLocationName: arrivalLocation.name,
      originCityName: citiesNamesCache[originLocation.city_id],
      destinationCityName: citiesNamesCache[arrivalLocation.city_id],
    };
  });
}

// Actions

function isLoadingAction(isLoading) {
  return {
    type: LOADING,
    payload: (typeof isLoading === 'undefined') ? false : isLoading,
  };
}

function isCompleteAction(isComplete) {
  return {
    type: COMPLETE,
    payload: (typeof isComplete === 'undefined') ? false : isComplete,
  };
}

function setDeparturesAction(departures) {
  return {
    type: DEPARTURES,
    payload: departures,
  };
}

const errorLoadingDepartures = (error, dispatch) => {
  const errorMessage = I18n.t('api.errorMessage');
  toastr.error('Error', errorMessage);
  // eslint-disable-next-line no-console
  console.error(errorMessage, error);
  dispatch([
    setDeparturesAction([]),
    isCompleteAction(true),
    isLoadingAction(false),
  ]);
};

export function pollDepartures() {
  return (dispatch, getState) => {
    dispatch(isLoadingAction(true));
    const store = getState();
    const locale = localeSelector(store);
    const filters = filtersSelector(store);
    const index = indexSelector(store);

    getDeparturesSearchRequest({
      filters,
      poll: true,
      locale,
      index,
    }).then((response) => {
      const departures = departuresSelector(store);
      const newDepartures = parseDepartures(response.data);


      const actionsToDispatch = [
        setDeparturesAction(departures.concat(newDepartures)),
        isCompleteAction(response.data.complete),
        isLoadingAction(false),
      ];

      if (newDepartures.length === 0 && response.data.complete === false) {
        actionsToDispatch.push(pollDepartures());
      }

      dispatch(actionsToDispatch);
    }).catch((error) => {
      errorLoadingDepartures(error, dispatch);
    });
  };
}

export function initDepartures() {
  return (dispatch, getState) => {
    dispatch(isLoadingAction(true));
    const store = getState();
    const locale = localeSelector(store);
    const filters = filtersSelector(store);

    getDeparturesSearchRequest({
      filters,
      poll: false,
      locale,
    }).then((response) => {
      const departures = parseDepartures(response.data);

      const actionsToDispatch = [
        setDeparturesAction(departures),
        isCompleteAction(response.data.complete),
        isLoadingAction(false),
      ];

      if (departures.length === 0 && response.data.complete === false) {
        actionsToDispatch.push(pollDepartures());
      }

      dispatch(actionsToDispatch);
    }).catch((error) => {
      errorLoadingDepartures(error, dispatch);
    });
  };
}
