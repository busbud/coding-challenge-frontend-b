import React, { Component } from 'react';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { departureDate, handleDateChange, initialSearch } = this.props;
    return (
      <div className="search-container">
        <img
          src="https://www.osheaga.com/uploads/osheaga/Logos/Logo%20Bell%20Osheaga-En.png?v=7b63dcf0bd4659aea06ac80ac45b1b73"
          className="logo-image"
        ></img>
        <div className="search-input-container">
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
      </div>
    );
  }
}

export default SearchContainer;
