import React, { Component } from 'react';
import find from 'lodash/find';
import counterpart from 'counterpart';

import Departure from './Departure.jsx';
import Loader from './Loader.jsx';

const DepartureList = React.createClass ({
  render: function() {
    let self = this;

    if (this.props.loading ) {
      return (<Loader />);
    }

    if (this.props.departures.length) {
      var departures = this.props.departures.map(function(departure) {
        // get pretty date formats from ISO
        var departureISODate = new Date(departure.departure_time);
        var arrivalISODate = new Date(departure.arrival_time);
        var departureDate = departureISODate.toLocaleDateString(counterpart.getLocale());
        var arrivalDate = arrivalISODate.toLocaleDateString(counterpart.getLocale());
        var departureTime = departureISODate.toLocaleTimeString([counterpart.getLocale()], {hour: '2-digit', minute: '2-digit'});
        var arrivalTime = arrivalISODate.toLocaleTimeString([counterpart.getLocale()], {hour: '2-digit', minute: '2-digit'});
        var amenities = departure.amenities;
        var deeplink = departure.links.deeplink;

        var operatorName = find(self.props.operators, { id: departure.operator_id }).display_name;
        
        var originLocation = find(self.props.locations, {id: departure.origin_location_id}).name;
        var destinationLocation = find(self.props.locations, {id: departure.destination_location_id}).name;

        return (
          <Departure 
            key={departure.busbud_departure_id}
            price={(departure.prices.total*0.01).toFixed(2)}
            operatorName={operatorName}
            departureDate={departureDate}
            arrivalDate={arrivalDate}
            departureTime={departureTime}
            arrivalTime={arrivalTime}
            originLocation={originLocation}
            destinationLocation={destinationLocation}
            amenities={amenities}
            deeplink={deeplink}
          />
        );
      });
      return (
        <div className='container'>
          {departures}
        </div>
      );
    }

    return (<span></span>)
  }
});

export default DepartureList;