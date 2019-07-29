import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1140px;
`
export default ({ children }) => <Container>{children}</Container>
