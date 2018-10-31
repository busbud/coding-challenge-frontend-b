import { Action } from '@ngrx/store';
import { Departure } from '../../models/departure.model';

export const LOAD_DEPARTURES = '[Main] Load departures';
export const LOAD_DEPARTURES_SUCCESS = '[Main] Load departures success';
export const LOAD_DEPARTURES_FAIL = '[Main] Load departures fail';

export class GetDepartures implements Action {
  readonly type = LOAD_DEPARTURES;
}

export class GetDeparturesSuccess implements Action {
  readonly type = LOAD_DEPARTURES_SUCCESS;
  constructor(public payload: Departure[]) {}
}

export class GetDeparturesFail implements Action {
  readonly type = LOAD_DEPARTURES_FAIL;
  constructor(public payload: any) {}
}

export type Actions = GetDepartures | GetDeparturesSuccess | GetDeparturesFail;
