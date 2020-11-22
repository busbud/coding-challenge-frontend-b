import { State } from './../../main/types';

export const getSearch = (state: State) => state.search;

export const getTicketsResponse = (state: State) => getSearch(state).tickets;

export const getDepartures = (state: State) =>
  getTicketsResponse(state).departures;

export const getLocations = (state: State) =>
  getTicketsResponse(state).locations;
