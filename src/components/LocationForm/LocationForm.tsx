import React, { useState } from 'react'
import useInterval from 'use-interval'
import { IntlText } from '../Intl/IntlText'
import { FormSearch } from 'grommet-icons'
import styled from 'styled-components'

import { LocationFormContainer, LocationFormBox } from './LocationFormContainer'
import LocationInput from '../LocationInput/LocationInput'
import LocationSwitch from '../LocationSwitch/LocationSwitch'
import DateInput from '../DateInput/DateInput'
import { CityDomain } from '../../domain/city'
import { DateDomain } from '../../domain/language'
import { useSearch } from '../../store/search/hooks'
import { useDepartures } from '../../store/departures/hooks'
import { PassengerSelect } from '../PassengerSelect/PassengerSelect'
import { DatePassengerGroup } from '../DatePassengerGroup/DatePassengerGroup'

const SearchButton = styled.button`
  display: inline-block;
  background: ${(props) => props.theme.colors.blueLight};
  border: none;
  padding: 0px 25px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: background 250ms ease-in;
  width: 100%;
  border-radius: 4px;
  margin: 10px;

  @media screen and (min-width: 900px) {
    width: auto;
    margin: 0;
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    background: ${(props) => props.theme.colors.yellow};
  }
`

const SearchButtonIcon = styled.span`
  display: inline-block;
  height: 24px;
  transform: translateY(5px);
`

const LocationForm = () => {
  const {
    switchPlaces,
    setPlace,
    setDate,
    getOrigin,
    getDestination,
    getOutboundDate,
  } = useSearch()

  const {
    isDeparturesSearchIncomplete,
    fetchDepartures,
    pollDepartures,
  } = useDepartures()

  useInterval(
    () => pollDepartures(),
    isDeparturesSearchIncomplete ? 3000 : null
  )

  const locationsSuggestions = CityDomain.getNames()
  return (
    <LocationFormContainer>
      <LocationFormBox direction="row" wrap={true}>
        <LocationInput
          formField={{
            label: <IntlText id="origin" />,
          }}
          textInput={{
            name: 'origin',
            value: getOrigin.name,
            placeholder: <IntlText id="select.origin" />,
            suggestions: locationsSuggestions,
            onChange: (event) =>
              setPlace({ field: 'origin', location: event.target.value }),
            onSelect: (event) => {
              event.target?.blur()
              setPlace({ field: 'origin', location: event.suggestion })
            },
          }}
        />
        <LocationSwitch onClick={() => switchPlaces()} />
        <LocationInput
          formField={{
            label: <IntlText id="destination" />,
          }}
          textInput={{
            name: 'destination',
            value: getDestination.name,
            placeholder: <IntlText id="select.destination" />,
            suggestions: locationsSuggestions,
            onChange: (event) =>
              setPlace({ field: 'destination', location: event.target.value }),
            onSelect: (event) => {
              event.target?.blur()
              setPlace({ field: 'destination', location: event.suggestion })
            },
          }}
        />
        <DatePassengerGroup direction="row" flex="grow">
          <DateInput
            value={getOutboundDate}
            onChange={(event) =>
              setDate(DateDomain.dateISO(new Date(event.value as string)))
            }
          />
          <PassengerSelect />
        </DatePassengerGroup>
        <SearchButton onClick={() => fetchDepartures()}>
          <SearchButtonIcon>
            <FormSearch color="#FFF" />
          </SearchButtonIcon>
          <IntlText id="search" />
        </SearchButton>
      </LocationFormBox>
    </LocationFormContainer>
  )
}

export default LocationForm
