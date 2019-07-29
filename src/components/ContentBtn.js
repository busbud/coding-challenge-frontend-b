import React, { useContext } from 'react'
import Styled from 'styled-components'
import { AppContext } from '../contexts'
import { fetchBusOptions } from '../util'

const Container = Styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 1140px;
  padding: 10%;
`
const Button = Styled.button`
  :focus {outline:none !important}

  background-color: hotpink;
  border: 2px solid hotpink;
  border-radius: 3px;
  color: white;
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
`

const SelectionMenuSubmitBtn = () => {
  const {
    language,
    outboundDate,
    origin,
    destination,
    busOptions,
    setBusOptions,
  } = useContext(AppContext)

  const submitText = language === 'EN' ? 'submit' : 'soumettre'
  const resetText = submitText === 'submit' ? 'Reset' : 'Refaire'

  function handleOnClick() {
    if (busOptions) {
      setBusOptions(null)
    } else {
      fetchBusOptions({
        language,
        outboundDate,
        origin,
        destination,
        setBusOptions,
      })
    }
  }

  return (
    <Container>
      <Button onClick={handleOnClick}>
        {busOptions ? resetText : submitText}
      </Button>
    </Container>
  )
}

export default SelectionMenuSubmitBtn
