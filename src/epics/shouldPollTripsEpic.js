import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {
  FETCH_TRIPS_SUCCESS,
  POLL_TRIPS_SUCCESS,
  pollTrips
} from '../actions/index';

export default (action$, store) => {
  return Observable.merge(
    action$.ofType(FETCH_TRIPS_SUCCESS),
    action$.ofType(POLL_TRIPS_SUCCESS)
  )
    .filter(({ apiResponse }) => !apiResponse.complete)
    .map(() => pollTrips(numberOfDeparturesInStore(store)));
};

function numberOfDeparturesInStore(store) {
  return store.getState().trips.apiResponse.departures.length;
}
