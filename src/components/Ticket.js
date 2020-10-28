import React from 'react';

export default function Ticket({departure, operator, cities}){

    function getTimes(time){
        let hours = new Date(time).getHours();
        let minutes = new Date(time).getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
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
                <div className="times">
                    <div>{getTimes(departure.departure_time)}</div>
                    <div>{getTimes(departure.arrival_time)}</div>
                </div>
                <div className="location">
                    <div><img src="location.png"/></div>
                    <div><img src="location.png"/></div>
                </div>                
                <div>
                    <div>{cities[0].name}</div> 
                    <div>{cities[1].name}</div>
                </div>
            </div>
            <div className="bottom"></div>
        </div>
    )
}