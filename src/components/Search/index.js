// thired part libraries
import React from 'react';

const Search = () => (
  < div className='group' >
    <div className='form-item'>
      <label htmlFor='depart'>From</label>
      <input className='form-input' defaultValue='New York' />
    </div>
    <div className='form-item'>
      <label htmlFor='arrive'>To</label>
      <input className='form-input' defaultValue='Montréal' />
    </div>
    <div className='form-item'>
      <label htmlFor='date'>On</label>
      <input className='form-input' defaultValue='2nd of August 2020' />
    </div>
  </div >
)

export default Search;
