import { State } from '..'
import { OperatorDomain } from '../../domain/operator'
import { DeparturesDomain } from '../../domain/search'

export const getDepartures = (state: State) => state.departures

export const getDeparturesCount = (state: State) =>
  getDepartures(state).departures.length

export const getIsDeparturesIncomplete = (state: State) =>
  [DeparturesDomain.INCOMPLETE, DeparturesDomain.PENDING].includes(
    getDepartures(state).status as string
  )

export const getIsDeparturesComplete = (state: State) =>
  getDepartures(state).status === DeparturesDomain.COMPLETE

export const getDepartureOperator = (
  state: State,
  operator_id: OperatorDomain.Operator['id']
) =>
  getDepartures(state).operators.find((operator) => operator.id === operator_id)
