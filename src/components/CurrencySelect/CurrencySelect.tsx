import React from 'react'
import { FormField, Select } from 'grommet'
import { CurrencyDomain } from '../../domain/currency'
import { useCurrency } from '../../store/currency/hooks'

const CurrencySelect = () => {
  const { currency, setCurrency } = useCurrency()
  return (
    <FormField>
      <Select
        options={CurrencyDomain.currencies}
        value={currency.value}
        onChange={({ option }) => setCurrency(option)}
      />
    </FormField>
  )
}

export default CurrencySelect
