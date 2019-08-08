import React from 'react';

import './card.styles.scss';

const Card = ({departures, destinations, origin, cities}) => (
    <div className='card-product'>
        <div className='card-info'>
            <p>Departure</p> 
            <h4>{cities[0].name}</h4>
            <h4>{`${new Date(departures.departure_time
                    .toString())
                    .toString()
                    .slice(0, 21)}`}
            </h4>
            <h4>{origin}</h4>
        </div>
        <div className='card-info'>
            <p>Arrival</p>
            <h4>{cities[1].name}</h4>
            <h4>{`${new Date(departures.arrival_time
                    .toString())
                    .toString()
                    .slice(0, 21)}`}
            </h4>
            <h4>{destinations}</h4>
        </div>
        <div className='card-info'>
            <p>Price</p> 
            <h4>
                {new Intl.NumberFormat('en-CAN', { 
                    style: 'currency', 
                    currency: 'CAN' })
                    .format(departures.prices.total * 1e-2.toFixed(2)
                )}
            </h4>
        </div>
    </div>
)

export default Card;
