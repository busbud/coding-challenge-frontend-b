import React from 'react'
import { formatTime, formatMoney } from '../../helpers'
import { Departure, Loading } from '../'
import { resultList } from './style.css'

const ResultList = ({departures, isFetching}) => {
    return (
      <div style={{width: '100%'}}>
        { isFetching ?(
            <Loading text='Loading'/>
          ) : (
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
      </div>
    )
}

export default ResultList
