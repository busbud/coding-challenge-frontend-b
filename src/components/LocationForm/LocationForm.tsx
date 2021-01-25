import React, { useState } from 'react'
import { Button } from 'grommet'
import { FormattedMessage } from 'react-intl'

import LocationInput from '../LocationInput/LocationInput'
import LocationSwitch from '../LocationSwitch/LocationSwitch'
import DateInput from '../DateInput/DateInput'
import { LocationDomain } from '../../domain/location'
import { DateDomain } from '../../domain/language'
import { useSearch } from '../../store/search/hooks'

const LocationForm = () => {
  const {
    switchPlaces,
    setPlace,
    setDate,
    getOrigin,
    getDestination,
    getOutboundDate,
  } = useSearch()
  const locationsSuggestions = LocationDomain.getNames()
  return (
    <>
      <LocationInput
        formField={{
          label: <FormattedMessage id="origin" />,
        }}
        textInput={{
          name: 'origin',
          value: getOrigin.name,
          placeholder: <FormattedMessage id="select.origin" />,
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
          label: <FormattedMessage id="destination" />,
        }}
        textInput={{
          name: 'destination',
          value: getDestination.name,
          placeholder: <FormattedMessage id="select.destination" />,
          suggestions: locationsSuggestions,
          onChange: (event) =>
            setPlace({ field: 'destination', location: event.target.value }),
          onSelect: (event) => {
            event.target?.blur()
            setPlace({ field: 'destination', location: event.suggestion })
          },
        }}
      />
      <DateInput
        dateField={{
          calendarProps: {
            bounds: [DateDomain.todayString(), '2025-01-01'],
          },
          name: 'date',
          value: getOutboundDate,
          defaultValue: DateDomain.todayString(),
          onChange: (event) =>
            setDate(DateDomain.dateISO(new Date(event.value as string))),
        }}
      />
      <Button>Search</Button>
    </>
  )
}

export default LocationForm
