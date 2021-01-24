import React, { useState } from 'react'
import { Button } from 'grommet'

import LocationInput from '../LocationInput/LocationInput'
import LocationSwitch from '../LocationSwitch/LocationSwitch'
import DateInput from '../DateInput/DateInput'
import CurrencySelect from '../CurrencySelect/CurrencySelect'

const LocationForm = () => {
  return (
    <>
      <LocationInput
        formField={{
          label: 'Origin',
        }}
        textInput={{
          placeholder: 'Select Origin',
          suggestions: ['Quebec'],
        }}
      />
      <LocationSwitch onClick={() => {}} />
      <LocationInput
        formField={{
          label: 'Destination',
        }}
        textInput={{
          placeholder: 'Select Destination',
          suggestions: ['Montreal'],
        }}
      />
      <DateInput />
      <Button>Search</Button>
    </>
  )
}

export default LocationForm
