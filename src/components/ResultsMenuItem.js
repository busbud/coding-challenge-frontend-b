import React, { useContext } from 'react'
import Styled from 'styled-components'
import constants from '../constants'
import { AppContext } from '../contexts'

const { translations } = constants

const Container = Styled.div`
  align-items: center;
  background-color: white;
  border: 2px solid hotpink;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  padding: 2%;
  margin: 1%;
  width: 100%;

  @media screen and (max-width: 599px) {
    flex-direction: column;
    justify-content: center;
  }
`
const Item = Styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5%;
  width: 33%;

  @media screen and (max-width: 599px) {
    flex-direction: column;
    width: 100%;
  }
`
const ItemLabel = Styled.p`
  font-size: 1rem;
  color: hotpink;
`
const ItemText = Styled.p`
  font-size: 1.1rem;
`

const ResultsMenuItem = ({ option }) => {
  const { language } = useContext(AppContext)
  const currentLanguage = language === 'EN' ? translations.EN : translations.FR
  const {
    departureTimeLabel,
    departureAddressLabel,
    arrivalTimeLabel,
    arrivalAddressLabel,
    travelTimeLabel,
    operatorLabel,
    priceLabel,
  } = currentLanguage
  const {
    departureTime,
    departureAddress,
    departureCity,
    arrivalTime,
    arrivalAddress,
    arrivalCity,
    operator,
    price,
    currency,
    travelTime,
  } = option

  return (
    <Container>
      <Item>
        <ItemLabel>{departureTimeLabel}</ItemLabel>
        <ItemText>{departureTime}</ItemText>
        <ItemLabel>{departureAddressLabel}</ItemLabel>
        <ItemText>{departureAddress}</ItemText>
        <ItemText>{departureCity}</ItemText>
      </Item>
      <Item>
        <ItemLabel>{arrivalTimeLabel}</ItemLabel>
        <ItemText>{arrivalTime}</ItemText>
        <ItemLabel>{arrivalAddressLabel}</ItemLabel>
        <ItemText>{arrivalAddress}</ItemText>
        <ItemText>{arrivalCity}</ItemText>
      </Item>
      <Item>
        <ItemLabel>{travelTimeLabel}</ItemLabel>
        <ItemText>{`Hours: ${travelTime.hours} Minutes: ${
          travelTime.minutes
        }`}</ItemText>
        <ItemLabel>{operatorLabel}</ItemLabel>
        <ItemText>{operator}</ItemText>
        <ItemLabel>{priceLabel}</ItemLabel>
        <ItemText>{`$${price} ${currency}`}</ItemText>
      </Item>
    </Container>
  )
}

export default ResultsMenuItem
