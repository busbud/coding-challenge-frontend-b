import React from 'react';
import moment from 'moment';

const Card = ({ data }) => {
  return (
    <div className="card">
      <div className="card-top"> ${Math.ceil(data.prices.total / 100, 0)} </div>
      <div className="card-middle">
        <div className="card-middle-icon">
          origin-icon <br></br>departure-icon
        </div>
        <div className="card-middle-date">
          <p>{moment(data.departure_time).format('LT')}</p>
          <p>{moment(data.arrival_time).format('LT')}</p>
        </div>
      </div>
      <div className="card-bottom"> Bottom </div>
    </div>
  );
};

export default Card;
