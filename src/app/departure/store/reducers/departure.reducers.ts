import { Departure } from '../../models/departure.model';
import * as fromDepartureActions from '../actions/departure.action';

export interface DepartureState {
  data: Departure[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: DepartureState = {
  data: [],
  loading: false,
  loaded: false,
};

export function DepartureReducer(
  state = initialState,
  action: fromDepartureActions.Actions,
): DepartureState {
  switch (action.type) {
    case fromDepartureActions.LOAD_DEPARTURES:
      return { ...state, loading: true };

    case fromDepartureActions.LOAD_DEPARTURES_SUCCESS:
      return { ...state, loading: false, loaded: true, data: action.payload };

    case fromDepartureActions.LOAD_DEPARTURES_FAIL:
      return { ...state, loaded: false, loading: false };

    default:
      return state;
  }
}

export const getDeparturesLoading = (state: DepartureState) => state.loading;
export const getDeparturesLoaded = (state: DepartureState) => state.loaded;
export const getDepartures = (state: DepartureState) => state.data;
