import React from 'react';
import moment from 'moment';
import './DepartureItem.css';

const DepartureItem = ({
  origin,
  departureDate,
  destination,
  arrivalDate,
  price,
  currency
}) => {

  const depMoment = moment(departureDate);
  const arrMoment = moment(arrivalDate);

  const arrivalDaysOffset = (
    depMoment.date() === arrMoment.date()
      ? ''
      : `(+${Math.ceil(arrMoment.diff(depMoment, 'days', true)).toString()})`
  );

  return (
    <div className="DepartureItem box">
      <div className="flex-column origin">
        <div className="time">{depMoment.format('HH:mm')}</div>
        <div className="location-name">{origin}</div>
      </div>

      <div className="flex-column sep">
        <i className="fa fa-chevron-right lighten-color" aria-hidden='true' />
      </div>

      <div className="flex-column destination">
        <div className="time">{`${arrMoment.format('HH:mm')} ${arrivalDaysOffset}`}</div>
        <div className="location-name">{destination}</div>
      </div>

      <div className="flex-column price">
        <div className="price-value lighten-color">{`$${price} ${currency}`}</div>
        <div className="price-info is-hidden-mobile">one-way | per person</div>
      </div>
    </div>
  );
};

export default DepartureItem;
