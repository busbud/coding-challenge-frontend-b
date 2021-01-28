import React from 'react'
import styled from 'styled-components'
import { IntlText } from '../Intl/IntlText'
import DepartureListItem from './DepartureListItem'

const Text = styled.h2`
  display: block;
  margin: ${(props) => props.theme.padding} auto;
  font-size: 20px;
`

type DeparturesListCounter = {
  count: number
}

const DeparturesListCounter = (props: DeparturesListCounter) => (
  <Text>
    <IntlText id="departures.count" values={{ count: props.count }} />
  </Text>
)

export default DeparturesListCounter
