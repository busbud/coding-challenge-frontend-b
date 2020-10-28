import React from 'react';
import dots from '../dots.png'

export default function Ticket({departure, operator, originLocation, destinationLocation, cities}){

    function getTimes(time){
        let hours = new Date(time).getHours();
        let minutes = new Date(time).getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }        
        return hours + ':' + minutes
    }

    
    return(
        <div className="ticket">
            <div className="top">
                <img src={operator.logo_url}/>
                <div className="price">
                    <span>{departure.prices.currency} </span>
                    <span>{departure.prices.total / 100}</span>
                </div>
            </div>
            <div className="middle">
                <div className="icons">
                    <div><img src="location.png"/></div>
                    <img src={dots}/>
                    <div><img src="location.png"/></div>
                </div>                
                <div className="times">
                    <div>{getTimes(departure.departure_time)}</div>
                    <div>{getTimes(departure.arrival_time)}</div>
                </div>
                <div className="locations">
                    <div>{originLocation + ', ' + cities[0].name}</div> 
                    <div>{destinationLocation + ', ' + cities[1].name}</div>
                </div>
            </div>
            <div className="bottom"></div>
        </div>
    )
}