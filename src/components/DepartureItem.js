import React from 'react';
import PropTypes from 'prop-types';

const DepartureItem = ({ departure, locations, cities }) => {

//Get hours and minutes from a datetime input
  const formatTime = (date) => {
    var d = new Date(date);
    var h = d.getHours();
    var m = d.getMinutes();
    var mm = m < 10 ? `0${m}` : m;
    var ampm = h >= 12 ? 'pm' : 'am';
    return `${h}:${mm} ${ampm}`;
    };

  const formatPrice = (price) => {
        price = (price-(price%100))/100;
        return price;
    };

     //Find location name
  const findLocationName = (id) => {
      var loc = locations.find(x => x.id === id);
      return loc.name;
  } 

        return (
            <div className="card text-left">
                <p>
                    <i className="far fa-dot-circle"></i>
                    {formatTime(departure.departure_time)} 
                    <span style={spanStrong}> - {cities[0].name} - </span>
                    <span>  {findLocationName(departure.origin_location_id)}</span>
                </p>
                <p className="text-right text-dark">{formatPrice(departure.prices.total)} <span style={spanLight}> {departure.prices.currency} </span></p>
                <p>
                    <i className="fas fa-map-marker-alt"></i>
                    {formatTime(departure.arrival_time)}
                    <span style={spanStrong}> - {cities[1].name} - </span>
                    {findLocationName(departure.destination_location_id)}
                </p>
            </div>
        )
}

const spanLight = {
    fontSize: '0.8rem',
    color: 'grey',
}
const spanStrong = {
    fontWeight: 'bold'
}

DepartureItem.propTypes = {
    departure: PropTypes.object.isRequired,
}

export default DepartureItem
