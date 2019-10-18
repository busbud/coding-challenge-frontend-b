import React from 'react';

const SearchInputForm = ({ initialSearch, departureDate, handleDateChange }) => {
  return (
    <div className="search-input-form">
      <div className="form-input" id="origin-input">
        New York
      </div>
      <div className="form-input" id="destination-input">
        Montreal
      </div>
      <div className="form-input" id="passenger-input">
        1 Adult
      </div>
      <input
        className="form-input"
        type="date"
        id="date-input"
        value={departureDate}
        onChange={handleDateChange}
      ></input>
      <button type="submit" className="search-button" onClick={initialSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchInputForm;
