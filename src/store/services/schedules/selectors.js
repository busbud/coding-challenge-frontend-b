import { createImmutableSelector } from '../../config/selectors'

const getLocalState = state => state.get('schedules')

const citiesById = createImmutableSelector(
  getLocalState,
  (cities) => cities.get('cities').get('byId').toJS()
)

const cities = createImmutableSelector(
  getLocalState,
  (cities) => cities.get('cities').get('ids').toJS()
)

const departuresById = createImmutableSelector(
  getLocalState,
  (departures) => departures.get('departures').get('byId').toJS()
)

const departures = createImmutableSelector(
  getLocalState,
  (departures) => departures.get('departures').get('ids').toJS()
)

const locationsById = createImmutableSelector(
  getLocalState,
  (locations) => locations.get('locations').get('byId').toJS()
)

const operatorsById = createImmutableSelector(
  getLocalState,
  (operators) => operators.get('operators').get('byId').toJS()
)

export const getCities = createImmutableSelector(
  citiesById,
  cities,
  (byId, ids) => ids.map(id => byId[id])
)

export const getDepartures = createImmutableSelector(
  departuresById,
  departures,
  (byId, ids) => ids.map(id => byId[id])
)

export const getLoading = createImmutableSelector(
  getLocalState,
  (schedules) => schedules.get('isLoading')
);

export const getLocationNameById = ({ locationId }) => createImmutableSelector(
  locationsById,
  byId => byId[locationId] && byId[locationId].name
)

export const getOperatorById = ({ operatorId }) => createImmutableSelector(
  operatorsById,
  byId => byId[operatorId] && byId[operatorId]
)