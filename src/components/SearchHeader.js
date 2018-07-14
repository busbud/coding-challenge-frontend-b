import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SearchHeader = (props) => {
  // here we are a oversimplifying the process
  // we would somehow get the geohash from the city input components (origin and destination)
  // to simplify, we are hardcoding 'New York' and 'Montréal'
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit('dr5reg', 'f25dvk', e.target.outbound_date.value);
  }

  return (<Fragment>
    <form onSubmit={handleSubmit} >
      <label>From:</label>
      <input type="text" value="New York" disabled />
      <label>To:</label>
      <input type="text" value="Montréal" disabled />
      <input name="outbound_date" type="date" defaultValue="2018-07-30" />
      <button type="submit">Search</button>
    </form>
  </Fragment>);
}

SearchHeader.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchHeader;
