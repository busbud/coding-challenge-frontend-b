import React, {Component} from 'react'
import DatePicker from 'react-datepicker';

import { search } from './style.css'
require('react-datepicker/dist/react-datepicker-cssmodules.css')

const Search = ({handleSubmit}) => (
  <form className={search} onSubmit={handleSubmit}>
    <input type="text" value="New York"/>
    <input type="text" value="Montreal"/>
    <DatePicker />
    <input/>
    <input type="submit"/>
  </form>
)

 export default Search