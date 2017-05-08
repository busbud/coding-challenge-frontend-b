import React from 'react'
import { formatTime, formatMoney } from '../../helpers'
import { Departure } from '../'
import { resultList } from './style.css'

const ResultList = ({departures}) => {

  return (
    <ul className={resultList}>
      { departures.map((dep, i) => <li key={i}>
        <Departure
          departure={dep}
          formatTime={formatTime}
          formatMoney={formatMoney} />
      </li>)}
    </ul>
  )
}

export default ResultList
