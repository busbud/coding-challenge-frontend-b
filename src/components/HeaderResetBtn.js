import React, { useContext } from 'react'
import Styled from 'styled-components'
import { AppContext } from '../contexts'

const Container = Styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Button = Styled.button`
  background-color: hotpink;
  border: 2px solid hotpink;
  border-radius: 3px;
  color: white;
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
`

const SelectionMenuSubmitBtn = () => {
  const { language, setBusOptions } = useContext(AppContext)

  const text = language === 'EN' ? 'Reset' : 'Refaire'

  function handleOnClick() {
    setBusOptions(null)
  }

  return (
    <Container>
      <Button onClick={handleOnClick}>{text}</Button>
    </Container>
  )
}

export default SelectionMenuSubmitBtn
