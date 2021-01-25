import { useSelector } from 'react-redux'

import { actions } from '../search'
import { getOrigin, getDestination, getOutboundDate } from '../search/selectors'
import { useAction } from '../useAction'

export const useSearch = () => {
  return {
    getOrigin: useSelector(getOrigin),
    getDestination: useSelector(getDestination),
    switchPlaces: useAction(actions.switchPlaces),
    setPlace: useAction(actions.setPlace),
    setDate: useAction(actions.setDate),
    getOutboundDate: useSelector(getOutboundDate),
  }
}
