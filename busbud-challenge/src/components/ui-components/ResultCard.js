import React from 'react';
import styled from 'styled-components';
import {
  Card,
  Heading
} from 'rebass';

const Text = styled.p`
  font-size: 1rem;
  b {
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
  <Card
    p={3}
    width={11/12}
    borderRadius={2}
    boxShadow='0 0 16px rgba(0, 0, 0, .25)'
    bg="#565656"
    color="#48b1bf"
  >
    <Heading as='h2'>{props.title}</Heading>
    <Text><b>Departure:</b> {getFormattedDate(props.departure)}</Text>
    <Text><b>Arrival:</b> {getFormattedDate(props.arrival)}</Text>
    <Text><b>From:</b> {props.depLocation}</Text>
    <Text><b>To:</b> {props.arrLocation}</Text>
    <Text><b>Price:</b> {props.price} {props.currency}</Text>
  </Card>
)
/* 
  <Card
    p={1}
    borderRadius={2}
    boxShadow='0 0 16px rgba(0, 0, 0, .25)'>
    <Image src={photo} />
    <Box px={2}>
      <Heading as='h3'>
        Card
      </Heading>
      <Text fontSize={0}>
        Small meta text
      </Text>
    </Box>
  </Card>
*/