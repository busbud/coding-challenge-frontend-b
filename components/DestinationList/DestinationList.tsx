import { FC } from 'react'
import { useDestination } from '../../hooks/useDestination'
import Card from '../Card/Card'
import LoadingBus from '../LoadingBus/LoadingBus'
import { List } from './styles'

const DestinationList: FC = () => {
  const { destinationList, isFetching } = useDestination()

  return (
    <List>
      {isFetching ? (
        <LoadingBus />
      ) : (
        destinationList.map(item => <Card item={item} />)
      )}
    </List>
  )
}

export default DestinationList
