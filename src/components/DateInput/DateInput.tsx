import React from 'react'

import { FormField, DateInput } from 'grommet'

const Input = () => (
  <FormField>
    <DateInput
      format="mm/dd/yyyy"
      value={new Date().toISOString()}
      onChange={({ value }) => {}}
    />
  </FormField>
)

export default Input
