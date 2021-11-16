import { FC } from 'react'
import { Destination } from '../../interfaces'
import { formatDate } from '../../utils/helpers'
import { CardContainer, V, Row, Register, Title, Value, Price } from './styles'

interface props {
  item: Destination
}

const Card: FC<props> = props => {
  const { item } = props

  return (
    <CardContainer key={item.id}>
      <V>
        <Row>
          <Register>
            <Title>Departure</Title>
            <Value>{item.originLocationName}</Value>
          </Register>

          <Register>
            <Title>At</Title>
            <Value>{formatDate(item.departureTime)}</Value>
          </Register>
        </Row>
        <Row>
          <Register>
            <Title>Arrival</Title>
            <Value>{item.destinationLocationName}</Value>
          </Register>
          <Register>
            <Title>At</Title>
            <Value>{formatDate(item.arrivalTime)}</Value>
          </Register>
        </Row>
      </V>
      <Price>{item.price}</Price>
    </CardContainer>
  )
}

export default Card
