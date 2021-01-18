// Packages
import React from 'react'

// Component
import PassengerInput from '.'

export default {
  title: 'Components/PassengerInput',
  component: PassengerInput
}

export function Default() {
  const handleChange = (params) => console.log(params)
  return <PassengerInput onChange={handleChange} />
}

export function Borderless() {
  const handleChange = (params) => console.log(params)
  return <PassengerInput borderless onChange={handleChange} />
}
