// Packages
import React from 'react'
import dynamic from 'next/dynamic'

// Layout
import { Box } from 'layout/box'

const Select = dynamic(() => import('components/select'), { ssr: false })

const ageFieldFactory = (
  field = [],
  name: string,
  label: string | number,
  options: Record<string | number, string | number>[],
  values: Record<string | number, string | number>[],
  handleChange
) => {
  return field.map((_, i) => {
    const selectedOption = values[i]
      ? {
          label: values[i].label,
          value: values[i].paxCount
        }
      : undefined

    return (
      <Box key={i} margin="0.5rem">
        <Select
          instanceId={`${name}_${i}`}
          name={`${name}_${i}`}
          placeholder={`${label} ${i + 1}`}
          options={options}
          onChange={handleChange}
          value={selectedOption}
        />
      </Box>
    )
  })
}

export default ageFieldFactory
