import React from 'react'
import { Box } from 'grommet'
import ClipLoader from 'react-spinners/ClipLoader'

import { DeparturesDomain } from '../../domain/search'
import { useDepartures } from '../../store/departures/hooks'
import DeparturesListCounter from './DeparturesListCounter'
import DepartureListItem from './DepartureListItem'

const DeparturesListContainer = () => {
  const {
    getDepartures,
    getDeparturesCount,
    isDeparturesSearchIncomplete,
    isDeparturesSearchComplete,
  } = useDepartures()
  const departuresFormatted = DeparturesDomain.responseToList(getDepartures)
  console.log(departuresFormatted)
  const departuresComponent = departuresFormatted.map((departure) => (
    <DepartureListItem key={departure.id} departure={departure} />
  ))
  return (
    <Box>
      {isDeparturesSearchIncomplete && (
        <Box justify="center" direction="row" margin={{ vertical: '7px' }}>
          <ClipLoader size={35} color="#fbae17" />
        </Box>
      )}
      {isDeparturesSearchComplete && (
        <DeparturesListCounter count={getDeparturesCount} />
      )}
      {Boolean(getDeparturesCount) && departuresComponent}
    </Box>
  )
}

export default DeparturesListContainer
