import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Departure = props => {
    return (<div className="container">

        <div className="row">
            <div className="col-12 text-center">
                <img src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png" alt="festival logo"/>
            </div>            
        </div>

        <div className="row">

        </div>

        {props.loading ? (<p>Loading</p>) : null}
        <button onClick={props.onFetchDepartures}>Departures</button>

        {props.departures.map(function(item, index){
            return ( <div key={index}>
                <p>{item.operator}</p>
                <p>{item.originLocationName}</p>
                <p>{item.departureTime}</p>
                <p>{item.destinationLocationName}</p>
                <p>{item.arrivalTime}</p>
                <p>{item.price}</p>
                </div>);
        })}

    </div>);
}

Departure.propTypes = {
    onFetchDepartures: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    departures: PropTypes.array.isRequired
};

export default Departure