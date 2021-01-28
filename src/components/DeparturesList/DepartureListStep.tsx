import React, { ReactNode } from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import { Icon } from 'grommet-icons'

export type Props = {
  icon: any
  stepName: ReactNode
  stepLocation: ReactNode
  stepDuration: string | Date
}

const Text = styled.p`
  font-size: 16px;
  margin: 4px 5px 0;
  line-height: 1;
  color: ${(props) => props.theme.colors.blue};
`
const Location = styled.span`
  font-weight: 400;
  font-size: 14px;
`

const DepartureListStep = (props: Props) => (
  <Box direction="row" align="center" gap="xsmall">
    {props.icon}
    <Text>{props.stepDuration}</Text>
    <Text>
      <b>
        {props.stepName} - <Location>{props.stepLocation}</Location>
      </b>
    </Text>
  </Box>
)

export default DepartureListStep
