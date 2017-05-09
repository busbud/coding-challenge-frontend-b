import React from 'react';
import { main } from './style.css'
import { Redirect } from 'react-router-dom'

const Home = (props) => {
  return(
    <div className={main}>
      <h1> Did you spend all your money on OSHEAGA tickets? </h1>
      <h3> Get To Montreal On A Budget with BusBud </h3>
      <button onClick={() => props.history.push('/bus-schedule-results/dr5reg/f25dvk/2017-07-29')}> Don't Miss The Bus </button>
    </div>
  )
}

export default Home