// Packages
import React from 'react'

// Component
import DateField from '.'

export default {
  title: 'Components/DateField',
  component: DateField
}

export function Default() {
  const [value, setValue] = React.useState(undefined)

  return (
    <DateField
      name="date"
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
    />
  )
}
