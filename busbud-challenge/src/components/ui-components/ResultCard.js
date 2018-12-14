import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  padding: 0.5rem;
  margin-top: 1rem;
`

const Flex= styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const Title = styled.h1`
  font-size: 2rem;
`

const DataCopy = styled.p`
  font-size: 1rem;
  bold {
    font-weight: 700
  }
`

function getFormattedDate(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return month + '/' + day + '/' + year;
}

export const ResultCard = (props) => (
  <Card>
    <Title>{props.title}</Title>
      <Flex>
        <DataCopy><b>Departure:</b> {getFormattedDate(props.departure)}</DataCopy>
        <DataCopy><b>Arrival:</b> {getFormattedDate(props.arrival)}</DataCopy>
        <DataCopy><b>From:</b> {props.depLocation}</DataCopy>
        <DataCopy><b>To:</b> {props.arrLocation}</DataCopy>
        <DataCopy><b>Price:</b> {props.price} {props.currency}</DataCopy>
      </Flex>
  </Card>
)