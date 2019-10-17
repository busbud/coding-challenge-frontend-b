import React from 'react';

const Card = ({ data }) => {
  return (
    <div className="card">
      Price: {data.prices.total / 100} <br></br>Departure: {data.departure_time} <br></br>
      Arrival: {data.arrival_time}
    </div>
  );
};

export default Card;
