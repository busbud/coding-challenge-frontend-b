import React from "react";

import { getTimeFromMins, getTimefromDate, formatPrice } from "./../../utils/helper"

import "./DepartureCard.scss";

const DepartureCard = ({
  departure,
  operator,
  locations

}) => {
  const {
    prices,
    departure_time,
    arrival_time,
    duration,
  } = departure;

  console.log(locations)

  return (
    <div className="departure-card">
      <div className="departure-card__header">
        <img src={operator.logo_url} alt={operator.name} />
        <p className="departure-card__price">{formatPrice(prices.total)} {prices.currency}</p>
      </div>
      <div className="departure-card__content">
        <div className="departure-card__origin">
          <div className="departure-card__time">{getTimefromDate(departure_time)}</div>
          <div className="departure-card__location">
            <span className="departure-card__location__city">{locations.origin.city.name}</span>
            <span className="departure-card__location__place">{locations.origin.name}</span>
          </div>
        </div>
        <div className="departure-card__destination">
          <div className="departure-card__time">{getTimefromDate(arrival_time)}</div>
          <div className="departure-card__location">
            <span className="departure-card__location__city">{locations.destination.city.name}</span>
            <span className="departure-card__location__place">{locations.destination.name}</span>
          </div>
        </div>
      </div>
      <div className="departure-card__footer">
        <div className="departure-card__travel-time">{getTimeFromMins(duration)}</div>
      </div>
    </div>
  )
}

export default DepartureCard;
