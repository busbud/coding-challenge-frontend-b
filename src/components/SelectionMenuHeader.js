import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 5%;
  width: 100%;
`

const Text = Styled.p`
  color: hotpink;
  font-size: 4.5vw;
  font-family: 'Permanent Marker', cursive;
`

export default ({ children }) => (
  <Container>
    <Text>{children}</Text>
  </Container>
)
