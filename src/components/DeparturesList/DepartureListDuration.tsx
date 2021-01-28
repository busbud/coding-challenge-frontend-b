import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import { Clock, Bus } from 'grommet-icons'
import { styledTheme } from '../../styles/theme'

type Props = {
  duration: string
}

const Text = styled.p`
  font-size: 16px;
  margin: 0;
  margin-top: 6px;
  line-height: 1;
  color: ${(props) => props.theme.colors.blue};
`

const DepartureListDuration = (props: Props) => (
  <Box direction="row" gap="xsmall" align="center" margin={{ top: '15px' }}>
    <Bus size="20px" color={styledTheme.colors.blueLight} />
    <Clock size="20px" color={styledTheme.colors.blueLight} />
    <Text>{props.duration}</Text>
  </Box>
)

export default DepartureListDuration
