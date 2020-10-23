import types from './action-types';
import type { Departure, DepartureState } from './state';

export default {
  [types.SET_DEPARTURES](
    state: DepartureState,
    departures: Departure[]
  ): DepartureState {
    return { ...state, departures };
  },
};
