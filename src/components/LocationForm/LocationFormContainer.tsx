import styled from 'styled-components'
import { Box } from 'grommet'

export const LocationFormContainer = styled.div`
  width: 100%;
  text-align: center;
`
export const LocationFormBox = styled(Box)`
  text-align: left;
  background: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: 0px 6px 12px rgb(32 65 90 / 10%), 0px 1px 4px rgb(32 65 90 / 10%);
  padding: 0;
  display: inline-flex;
  margin: ${(props) => props.theme.padding} auto;
  justify-content: center;
  > div {
    flex-basis: 100%;
  }
  @media screen and (min-width: 900px) {
    > div {
      flex-basis: auto;
    }
  }
`
