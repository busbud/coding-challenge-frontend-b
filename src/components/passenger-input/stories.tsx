// Packages
import React from 'react'

// Component
import PassagerInput from '.'

export default {
  title: 'Components/PassagerInput',
  component: PassagerInput
}

export function Default() {
  const handleChange = (params) => console.log(params)
  return <PassagerInput onChange={handleChange} />
}

export function Borderless() {
  const handleChange = (params) => console.log(params)
  return <PassagerInput borderless onChange={handleChange} />
}
