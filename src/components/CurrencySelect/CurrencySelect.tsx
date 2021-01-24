import React from 'react'
import { FormField, Select } from 'grommet'

const CurrencySelect = () => {
  const [value, setValue] = React.useState('medium')

  return (
    <FormField>
      <Select
        options={['BRL', 'USD', 'CAD']}
        value={value}
        onChange={({ option }) => setValue(option)}
      />
    </FormField>
  )
}

export default CurrencySelect
