// thired part libraries
import React from 'react';

// images 
import BusIcon from '../../assets/bus.png'

// styles
import './Card.scss'

const Card = (props) => {
  const { arrival_time, departure_time, total_price, departure_location, arrival_location } = props;

  return (
    <div className="card-container">
      <div>
        <h2>{departure_location.city_name}</h2>
        <p>{departure_location.name}</p>
        <p>{new Date(departure_time).toLocaleTimeString()}</p>
      </div>
      <div>
        <img src={BusIcon} alt="bus-icon" width='80' />
      </div>

      <div>
        <h2>{arrival_location.city_name}</h2>
        <p>{arrival_location.name}</p>
        <p>{new Date(arrival_time).toLocaleTimeString()}</p>
      </div>
      <hr></hr>
      <span>
        <sup>&#36;</sup>
        {total_price}
      </span>
    </div>
  )
}

export default Card;
