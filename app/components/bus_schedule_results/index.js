import React, { Component } from 'react'
import { ResultListContainer } from '../../containers'

const BusScheduleResults = ({match}) => {
  return <ResultListContainer params={match.params} />
}

export default BusScheduleResults