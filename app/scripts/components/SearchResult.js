import React from 'react';

function SearchResult({ time, departing, arriving, price, operator }) {
  return (
    <div className="searchResult">
      <div
        style={{ backgroundImage: `url(${operator.logo})` }}
        className="searchResult-operatorLogo"
      />

      <div className="searchResult-column">
        <strong className="searchResult-time">{time}</strong>
        <div className="searchResult-row">
          <img src="assets/from-to.svg" role="presentation" className="searchResult-icons" />
          <div className="searchResult-departures">
            <div className="searchResult-loc-group">
              <p className="searchResult-location">{departing.location}</p>
              <p className="searchResult-city">{departing.city}</p>
            </div>
            <div className="searchResult-loc-group">
              <p className="searchResult-location">{arriving.location}</p>
              <p className="searchResult-city">{arriving.city}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="searchResult-cost">
        <div className="searchResult-price-group">
          <span className="searchResult-price">${price.price}</span>
          <span className="searchResult-currency">{price.currency}</span>
        </div>
      </div>
    </div>
  );
}
SearchResult.propTypes = {
  time: React.PropTypes.string.isRequired,
  departing: React.PropTypes.object.isRequired,
  arriving: React.PropTypes.object.isRequired,
  price: React.PropTypes.object.isRequired,
  operator: React.PropTypes.object.isRequired,
};

export default SearchResult;
