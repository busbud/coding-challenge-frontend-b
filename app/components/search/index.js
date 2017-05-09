import React, {Component} from 'react'
import DatePicker from 'react-datepicker'


import { search } from './style.css'
require('react-datepicker/dist/react-datepicker-cssmodules.css')

const Search = ({handleSubmit, leaving}) => {
  return (
    <form className={search} onSubmit={handleSubmit}>
      <div className="fieldset">
        <input type="text" value="New York" onClick={()=> console.log(this) }/>
        <input type="text" value="Montreal"/>
      </div>
      <DatePicker selected={leaving} />
      <input type="submit" value="search"/>
    </form>
  )
}

export default Search

