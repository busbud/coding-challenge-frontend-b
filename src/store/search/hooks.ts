import { useSelector } from 'react-redux'

import { actions } from '../search'
import {
  getOrigin,
  getDestination,
  getOutboundDate,
  getPassengers,
  getPassengersCount,
} from '../search/selectors'
import { useAction } from '../useAction'

export const useSearch = () => {
  return {
    getOrigin: useSelector(getOrigin),
    getDestination: useSelector(getDestination),
    switchPlaces: useAction(actions.switchPlaces),
    setPlace: useAction(actions.setPlace),
    setDate: useAction(actions.setDate),
    setPassenger: useAction(actions.setPassenger),
    getOutboundDate: useSelector(getOutboundDate),
    getPassengers: useSelector(getPassengers),
    getPassengersCount: useSelector(getPassengersCount),
  }
}
