import { useSelector } from 'react-redux'

import { useAction } from '../useAction'
import {
  getIsDeparturesIncomplete,
  getIsDeparturesComplete,
  getDepartures,
  getDeparturesCount,
} from './selectors'
import { fetchDepartures, pollDepartures } from '../search/thunks'

export const useDepartures = () => {
  return {
    getDepartures: useSelector(getDepartures),
    getDeparturesCount: useSelector(getDeparturesCount),
    isDeparturesSearchIncomplete: useSelector(getIsDeparturesIncomplete),
    isDeparturesSearchComplete: useSelector(getIsDeparturesComplete),
    fetchDepartures: useAction(fetchDepartures),
    pollDepartures: useAction(pollDepartures),
  }
}
