import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1140px;
  height: ${props => props.busOptions && props.busOptions.isLoading & '100vh'};
`
export default ({ children }) => <Container>{children}</Container>
