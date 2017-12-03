import React from "react";
import "./DepartureItem.css";

const DepartureItem = props => {
  return (
    <div className="DepartureItem box">

      <div className="flex-column origin">
        <div className="time">{props.departureTime}</div>
        <div className="location-name">{props.origin}</div>
      </div>

      <div className="flex-column sep">
        <i className="fa fa-chevron-right lighten-color" aria-hidden="true"/>
      </div>

      <div className="flex-column destination">
        <div className="time">{props.arrivalTime}</div>
        <div className="location-name">{props.destination}</div>
      </div>

      <div className="flex-column price">
        <div className="price-value lighten-color">{`$${props.price} ${props.currency}`}</div>
        <div className="price-info is-hidden-mobile">one-way | per person</div>
      </div>
    </div>
  );
};

export default DepartureItem;