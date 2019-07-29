import React, { useContext } from 'react'
import Styled from 'styled-components'
import SelectionMenuHeader from './SelectionMenuHeader'
import SelectionMenuSelector from './SelectionMenuSelector'
import { AppContext } from '../contexts'
import constants from '../constants'

const { translations } = constants

const SelectionMenuContainer = Styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const SelectionMenuSelectorContainer = Styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  width: 100%;

  @media screen and (max-width: 599px) {
      flex-direction: column;
  }
`

const SelectionMenu = () => {
  const { language, setOutboundDate, setOrigin, setDestination } = useContext(
    AppContext
  )
  const selectedLanguage = language === 'EN' ? translations.EN : translations.FR
  const {
    header,
    on,
    day,
    outboundDate,
    from,
    nyc,
    origin,
    to,
    mtl,
    destination,
  } = selectedLanguage

  const dateOptions = [{ label: day, value: outboundDate }]
  const originOptions = [{ label: nyc, value: origin }]
  const destinationOptions = [{ label: mtl, value: destination }]

  return (
    <SelectionMenuContainer>
      <SelectionMenuHeader>{header}</SelectionMenuHeader>
      <SelectionMenuSelectorContainer>
        <SelectionMenuSelector
          title={on}
          options={dateOptions}
          callback={setOutboundDate}
        />
        <SelectionMenuSelector
          title={from}
          options={originOptions}
          callback={setOrigin}
        />
        <SelectionMenuSelector
          title={to}
          options={destinationOptions}
          callback={setDestination}
        />
      </SelectionMenuSelectorContainer>
    </SelectionMenuContainer>
  )
}

export default SelectionMenu
