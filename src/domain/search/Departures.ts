export type Departures = {
  origin_city_id: string
  destination_city_id: string
  cities: []
  locations: []
  operators: []
  departures: []
  complete: boolean
  status?: DeparturesStatus
}

export const NOT_INITIALIZED = 'NOT_INITIALIZED'
export const PENDING = 'PENDING'
export const INCOMPLETE = 'INCOMPLETE'
export const COMPLETE = 'COMPLETE'
export const REJECTED = 'REJECTED'

export type DeparturesStatus =
  | typeof NOT_INITIALIZED
  | typeof PENDING
  | typeof INCOMPLETE
  | typeof COMPLETE
  | typeof REJECTED

export const setCompleteOrIncomplete = (status: boolean) => {
  return status ? COMPLETE : INCOMPLETE
}
