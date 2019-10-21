import React from 'react'
import styled from 'styled-components'

const Departure = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  flex-basis: 300px;
  box-sizing: border-box;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  text-align: center;
  line-height: 1.4em;
  .departure__text {
    font-size: 16px;
  }
  .departure__title {
    font-size: 18px;
    font-weight: bold;
  }
  @media only screen and (min-width: 1200px) {
    flex-basis: 400px;
  }
`;

export default ({ departureTime, arrivalTime, tripDuration, departureLocation, arrivalLocation, price }) => (
    <Departure>
        <p className='departure__title'>Departure</p>
    <p className='departure__text'>{departureLocation} on {departureTime}</p>
        <p className='departure__title'>Arrival</p>
    <p className='departure__text'>{arrivalLocation} on {arrivalTime}</p>
        <p className='departure__title'>Trip Duration</p>
        <p className='departure__text'>Approximately {tripDuration}</p>
        <p className='departure__title'>Total Price</p>
        <p className='departure__text'>{price}</p>
    </Departure>
)