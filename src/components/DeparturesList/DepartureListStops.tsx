import DepartureListDuration from './DepartureListDuration'

import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import DepartureListStepConnection from './DepartureListStepConnection'
import { IntlText } from '../Intl/IntlText'

type Props = {
  stops: number
}

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
`

const Connection = styled.span`
  display: inline-block;
  margin-right: 14px;
  margin-left: 8px;
`
const DepartureListStops = (props: Props) => (
  <Box margin={{ vertical: '6px' }} direction="row" align="center">
    <Connection>
      <DepartureListStepConnection />
    </Connection>
    {Boolean(props.stops) && (
      <Text>
        <IntlText id="stops" values={{ count: props.stops }} />
      </Text>
    )}
  </Box>
)
export default DepartureListStops
