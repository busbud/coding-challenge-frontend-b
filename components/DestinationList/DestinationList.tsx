import { FC } from 'react'
import { useDestination } from '../../hooks/useDestination'
import { FetchStatus } from '../../interfaces'
import Card from '../Card/Card'
import ErrorListStatus from '../ErrorListStatus/ErrorListStatus'
import InitialListStatus from '../InitialListStatus/InitialListStatus'
import LoadingBus from '../LoadingBus/LoadingBus'
import { List } from './styles'

const DestinationList: FC = () => {
  const { destinationList, fetchingStatus } = useDestination()

  if (fetchingStatus === FetchStatus.initial) return <InitialListStatus />
  if (fetchingStatus === FetchStatus.error) return <ErrorListStatus />
  if (fetchingStatus === FetchStatus.loading) return <LoadingBus />

  return (
    <List>
      {destinationList.map(item => (
        <Card item={item} />
      ))}
    </List>
  )
}

export default DestinationList
