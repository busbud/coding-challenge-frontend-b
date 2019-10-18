import React, { Component } from 'react';
import SearchInputForm from '../components/SearchInputForm';

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
        <SearchInputForm
          initialSearch={initialSearch}
          departureDate={departureDate}
          handleDateChange={handleDateChange}
        />
      </div>
    );
  }
}

export default SearchContainer;
