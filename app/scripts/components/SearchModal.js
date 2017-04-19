import React from 'react';
import moment from 'moment';
import SearchResult from './SearchResult';
import $ from '../locale-data.json';


function SearchModal({ dismissModal, status, results, date, locale }) {
  const { cities, departures, locations, operators } = results;
  const fromCity = results.cities[0];
  const toCity = results.cities[1];

  function parseTime(departure) {
    // Format departure times to "9:00 AM - 5:20 PM"
    const depTime = moment(departure.departure_time).format('LT');
    const arrTime = moment(departure.arrival_time).format('LT');
    return `${depTime} - ${arrTime}`;
  }

  function getLocation(id) {
    // Find location with location id
    const locationObj = locations.find((location) => location.id === id);

    // Find city for found location
    const cityObj = cities.find((city) => city.id === locationObj.city_id);

    return {
      location: locationObj.name,
      city: cityObj.name,
    };
  }

  function getPrice(departure) {
    // Format price to have no decimals
    const price = (departure.prices.total / 100).toFixed(0);
    const currency = departure.terms.currency;
    return { price, currency };
  }

  function getOperator(departure) {
    // Find operator with operator id
    const operatorObj = operators.find((operator) => operator.id === departure.operator_id);
    operatorObj.logo_url = operatorObj.logo_url.split('?')[0]; // Remove imgix paramters
    return {
      name: operatorObj.name,
      logo: operatorObj.logo_url,
    };
  }

  function renderResults(key) {
    return (
      <SearchResult
        key={key}
        time={parseTime(departures[key])}
        departing={getLocation(departures[key].origin_location_id)}
        arriving={getLocation(departures[key].destination_location_id)}
        price={getPrice(departures[key])}
        operator={getOperator(departures[key])}
      />
    );
  }
  return (
    <div className="searchModal-wrapper" >
      <div className={`searchModal ${status}`} >
        <div className="searchModal-header">
          <h2 className="searchModal-title">
          {`${fromCity.name} ${$[locale].to} ${toCity.name}, \
          ${moment(date).format('MMMM Do Y')}`}</h2>
          <button className="searchModal-exit" onClick={dismissModal}></button>
        </div>
        <div className="searchModal-results">
          {Object.keys(results.departures).map(renderResults)}
        </div>
      </div>
    </div>
  );
}
SearchModal.propTypes = {
  dismissModal: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  results: React.PropTypes.object.isRequired,
  date: React.PropTypes.string.isRequired,
  locale: React.PropTypes.string.isRequired,
};

export default SearchModal;
