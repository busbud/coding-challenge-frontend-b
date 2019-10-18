import React from 'react';
import moment from 'moment';

const Card = ({ data, operators, cities, locations }) => {
  let operator_url = operators.filter(el => el.id === data.operator_id)[0].logo_url;

  let origin_city_name = cities[0].name;
  let destination_city_name = cities[1].name;

  let origin_location_name = locations.filter(el => el.id === data.origin_location_id)[0].name;

  let destination_location_name = locations.filter(el => el.id === data.destination_location_id)[0]
    .name;

  let departure_time = moment(data.departure_time).format('LT');

  let arrival_time = moment(data.arrival_time).format('LT');

  let duration_time = moment(data.arrival_time).diff(moment(data.departure_time), 'minutes');

  let duration_hours = Math.floor(duration_time / 60, 0);

  let duration_minutes = duration_time % 60;

  let total_price = Math.ceil(data.prices.total / 100, 0);

  return (
    <div className="card">
      <div className="card-top">
        <img className="card-operator-logo" src={operator_url}></img>
        <p className="card-price">$ {total_price}</p>
      </div>
      <div className="card-middle">
        <div className="card-middle-icon">
          Departure <br></br>Arrival
        </div>
        <div className="card-middle-date">
          <p>
            {departure_time} {origin_city_name} - {origin_location_name}
          </p>
          <p>
            {arrival_time} {destination_city_name} - {destination_location_name}
          </p>
        </div>
      </div>
      <div className="card-bottom">
        {duration_hours}h {duration_minutes}m
      </div>
    </div>
  );
};

export default Card;
