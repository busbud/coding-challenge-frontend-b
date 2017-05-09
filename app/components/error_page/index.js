import React from 'react'
import { main } from './style.css'

const ErrorPage = (props) => (
  <div className={main}>
    <h1> {'It appears there was an error'} </h1>
    <h3> { 'we may have been sleeping' } </h3>
    <h3> { 'try again' } </h3>
  </div>
)

export default ErrorPage

