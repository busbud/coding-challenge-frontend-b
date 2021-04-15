import { useEffect } from 'react'
import { useAppContext, addLocation, addDeparture, completePoll } from '../../store'
import { ORIGIN_GEOHASH, DESTINATION_GEOHASH, FESTIVAL_DATE } from '../../utils/constants'
import { getXDeparturesPoll } from '../../utils/api'
import Departure from '../Depature'

interface IProps {
  pollCompleted: boolean
}

export default function DepatureList(props: IProps) {
  const [state , dispatch] = useAppContext()

  useEffect(() => {
    pollDepatures()
  }, [])

  const pollDepatures = async () => {
    let pollCompleted = props.pollCompleted || state.pollCompleted
    let departureCount = Object.keys(state.departures).length

    while(!pollCompleted) {
      try{
        const { locations, departures, complete } = await getXDeparturesPoll({
          origin: ORIGIN_GEOHASH,
          destination: DESTINATION_GEOHASH,
          outboundDate: FESTIVAL_DATE
        }, {
          index: departureCount + ''
        })

        locations.forEach(location => dispatch(addLocation(location)))
        departures.map(departure => dispatch(addDeparture(departure)))

        if(complete) {
          dispatch(completePoll())
          pollCompleted = true
        } else {
          departureCount += departures.length
        }
      } catch(error) {
        console.error(error)
        pollCompleted = true
      }
    }
  }

  return (
    <>
      { Object.keys(state.departures).map(id => <Departure key={id} departure={state.departures[id]} />) }
    </>
  )
}
