import React from "react";

import { formatTime, formatPrice } from "../utils/format-departure-info-helper";

export default class DepartureInfo extends React.Component {
  render() {
    const { departure } = this.props;

    const {
      arrival_time,
      departure_time,
      destination_location_name,
      origin_location_name,
      prices: { total }
    } = departure;
    return (
      <div className="departure-info-container">
        <div className="schedule-info">
          <div className="row">
            <div className="time">Departure: {formatTime(departure_time)}</div>
            <div className="location">{origin_location_name}</div>
          </div>
          <div className="row">
            <div className="time">Arrival: {formatTime(arrival_time)}</div>
            <div className="location">{destination_location_name}</div>
          </div>
        </div>
        <div className="schedule-details">
          <div className="price">${formatPrice(total)} USD</div>
        </div>
      </div>
    );
  }
}
