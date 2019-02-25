import { combineReducers } from 'redux';
import { isLoading } from './isLoading';
import { departures } from './departures';
import { locations } from './locations';
import { isDataComplete } from './isDataComplete';

export const rootReducer = combineReducers({
  departures,
  locations,
  isLoading,
  isDataComplete
});
