import React, { useState } from 'react'

import LocationInput from '../Form/LocationInput'

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
      <LocationInput
        formField={{
          label: 'Destination',
        }}
        textInput={{
          placeholder: 'Select Destination',
          suggestions: ['Montreal'],
        }}
      />
    </>
  )
}

export default LocationForm
