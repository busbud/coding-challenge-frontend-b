// Packages
import React from 'react'
import { Box } from 'layout/box'
import Select from 'components/select'

const ageFieldFactory = (
  field = [],
  name: string,
  label: string | number,
  options: Record<string | number, string | number>[],
  handleChange
) => {
  return field.map((_, i) => (
    <Box key={i} margin="0.5rem">
      <Select
        name={name}
        placeholder={`${label} ${i + 1}`}
        options={options}
        onChange={handleChange}
      />
    </Box>
  ))
}

export default ageFieldFactory
