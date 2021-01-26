import { useSelector } from 'react-redux'

import { useAction } from '../useAction'
import { getIsDeparturesIncomplete, getIsDeparturesComplete } from './selectors'
import { fetchDepartures, pollDepartures } from '../search/thunks'

export const useDepartures = () => {
  return {
    isDeparturesSearchIncomplete: useSelector(getIsDeparturesIncomplete),
    isDeparturesSearchComplete: useSelector(getIsDeparturesComplete),
    fetchDepartures: useAction(fetchDepartures),
    pollDepartures: useAction(pollDepartures),
  }
}
