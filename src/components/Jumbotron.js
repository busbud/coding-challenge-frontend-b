import React, { useContext } from 'react'
import Styled from 'styled-components'
import { AppContext } from '../contexts'

const Container = Styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100vw;
`

const Text = Styled.p`
  color: hotpink;
  font-size: 6vw;
  font-family: 'Permanent Marker', cursive;
`

export default () => {
  const { language } = useContext(AppContext)
  const text =
    language === 'EN' ? "Let's go to Osheaga!" : "Allons au festival d'Osheaga!"
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  )
}
