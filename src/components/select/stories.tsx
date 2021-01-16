// Packages
import React from 'react'
import styled from 'styled-components'
import {
  IoLocationOutline,
  IoRadioButtonOffOutline,
  IoPersonOutline
} from 'react-icons/io5'

// Component
import Select from '.'

const Div = styled.div`
  display: flex;
  > div {
    margin-right: 10px;
    width: 50%;
  }
`

export default {
  title: 'Components/Select',
  component: Select
}

export function Default() {
  return <Select />
}

export function Borderless() {
  return <Select icon={<IoPersonOutline />} borderless />
}

export function WithIcon() {
  return (
    <Div>
      <Select
        icon={<IoRadioButtonOffOutline />}
        options={[
          { value: 'Toronto', label: 'Toronto' },
          { label: 'Vancouver', value: 'Vancouver' }
        ]}
      />
      <Select
        icon={<IoLocationOutline />}
        options={[
          { value: 'Toronto', label: 'Toronto' },
          { label: 'Vancouver', value: 'Vancouver' }
        ]}
      />
    </Div>
  )
}
