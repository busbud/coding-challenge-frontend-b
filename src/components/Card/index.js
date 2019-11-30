// thired part libraries
import React from 'react';

// images 
import BusIcon from '../../assets/bus.png'

// styles
import {
  CardContainer,
  CardContent,
  DepartureDetails,
  ImageContainer,
  ArrivalDetails
}
  from './styled'

const Card = () => (
  <CardContainer>
    <CardContent>
      <DepartureDetails>
        <h2>From</h2>
      </DepartureDetails>
      <ImageContainer>
        <img src={BusIcon} alt="bus-icon" width="100" />
      </ImageContainer>
      <ArrivalDetails>
        <h2>To</h2>
      </ArrivalDetails>
    </CardContent>
  </CardContainer>
)

export default Card;
