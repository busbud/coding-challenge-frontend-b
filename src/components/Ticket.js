import React from 'react';

export default function Ticket({departure, operator, cities}){
    
    return(
        <div className="ticket">
            <div className="top">
                <img src={operator.logo_url}/>
                <div className="price">
                    <span>{departure.prices.currency} </span>
                    <span>{departure.prices.total}</span>
                </div>
            </div>
            <div className="middle">
                <span>{cities[0].name} -> {cities[1].name}</span>
                <div>{departure.departure_time} -> {departure.arrival_time}</div>
            </div>
            <div className="bottom"></div>
        </div>
    )
}