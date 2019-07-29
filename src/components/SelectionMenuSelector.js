import React, { useContext, useState } from 'react'
import Select from 'react-select'
import Styled from 'styled-components'
import { AppContext } from '../contexts'

const Container = Styled.div`
  width: 12rem;
`
const Title = Styled.p`
  font-size: 10;
  color: hotpink;
`

const SelectionMenuSelector = ({ title, options, callback }) => {
  const { language } = useContext(AppContext)
  const placeholder = language === 'EN' ? 'select...' : 'choisir...'
  const [selection, setSelection] = useState(null)

  function handleChange(selected) {
    setSelection(selected)
    callback(selected.value)
  }

  return (
    <Container>
      <Title>{title}</Title>
      <Select
        value={selection}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
      />
    </Container>
  )
}

export default SelectionMenuSelector
