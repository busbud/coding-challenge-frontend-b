import styled from 'styled-components'
import { Box } from 'grommet'

export const DatePassengerGroup = styled(Box)`
  width: 100%;
  flex-wrap: wrap;

  > div {
    flex-basis: 100%;
  }

  @media screen and (min-width: 600px) {
    flex-wrap: nowrap;
    > div {
      flex-basis: 100%;
    }
  }

  @media screen and (min-width: 900px) {
    width: auto;
    flex-basis: 1;
  }
`
