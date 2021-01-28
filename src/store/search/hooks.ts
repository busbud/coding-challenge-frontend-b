import { useSelector } from 'react-redux'

import { SearchDomain } from '../../domain/search'
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
  const setPassenger = useAction(actions.setPassenger)
  const _getPassengers = useSelector(getPassengers)

  const incrementPassenger = (id: SearchDomain.PassengerKeys) => {
    setPassenger({ passenger: id, value: ++_getPassengers[id] })
  }

  const decrementPassenger = (id: SearchDomain.PassengerKeys) => {
    const value =
      _getPassengers[id] > 0 ? --_getPassengers[id] : _getPassengers[id]
    setPassenger({ passenger: id, value })
  }

  return {
    setPassenger,
    getPassengers: _getPassengers,
    incrementPassenger,
    decrementPassenger,
    getOrigin: useSelector(getOrigin),
    getDestination: useSelector(getDestination),
    switchPlaces: useAction(actions.switchPlaces),
    setPlace: useAction(actions.setPlace),
    setDate: useAction(actions.setDate),
    getOutboundDate: useSelector(getOutboundDate),
    getPassengersCount: useSelector(getPassengersCount),
  }
}
