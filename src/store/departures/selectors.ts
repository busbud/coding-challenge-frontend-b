import { State } from '..'
import { DeparturesDomain } from '../../domain/search'

export const getDeparturesCount = (state: State) =>
  state.departures.departures.length

export const getIsDeparturesIncomplete = (state: State) =>
  state.departures.status === DeparturesDomain.INCOMPLETE

export const getIsDeparturesComplete = (state: State) =>
  state.departures.status === DeparturesDomain.COMPLETE
