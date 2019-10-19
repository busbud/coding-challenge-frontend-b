import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBus,
  faArrowAltCircleRight as fasArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight as farArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

const Card = ({ data, operators, cities, locations }) => {
  // extract the logo url from the operators array
  let operator_url = operators.filter(el => el.id === data.operator_id)[0].logo_url;

  // extract cities from the cities array
  let origin_city_name = cities[0].name;
  let destination_city_name = cities[1].name;

  // extract bus station location from the locations array using the id
  let origin_location_name = locations.filter(el => el.id === data.origin_location_id)[0].name;
  let destination_location_name = locations.filter(el => el.id === data.destination_location_id)[0]
    .name;

  // extract departure/arrival time from data prop
  let departure_time = moment(data.departure_time).format('LT');
  let arrival_time = moment(data.arrival_time).format('LT');

  // calculate the trip duration using the diff method from moment.js
  let duration_time = moment(data.arrival_time).diff(moment(data.departure_time), 'minutes');
  let duration_hours = Math.floor(duration_time / 60, 0);
  let duration_minutes = duration_time % 60;

  // extract the total price from data prop
  let total_price = Math.ceil(data.prices.total / 100, 0);

  return (
    <div className="card">
      <div className="card-top">
        <img className="card-operator-logo" src={operator_url}></img>
        <p className="card-price">${total_price}</p>
      </div>
      <div className="card-middle">
        <div className="card-middle-icon">
          <p>
            <FontAwesomeIcon icon={fasArrowAltCircleRight} />
          </p>
          <p>
            <FontAwesomeIcon icon={farArrowAltCircleRight} />
          </p>
        </div>
        <div className="card-middle-date">
          <p className="card-departure">
            {departure_time}
            {`   `}
            {origin_city_name} — {origin_location_name}
          </p>
          <p className="card-arrival">
            {arrival_time}
            {`   `}
            {destination_city_name} — {destination_location_name}
          </p>
        </div>
      </div>
      <div className="card-bottom">
        <p className="card-duration">
          <FontAwesomeIcon icon={faBus} />
          {` `}
          {duration_hours}h {duration_minutes}m
        </p>
      </div>
    </div>
  );
};

export default Card;
