import React from 'react';
import { Translate } from 'react-redux-i18n';

// for air itinerary
const Bus = props => (
  <div className="col-12">
    <div className="row">
      <div className="col-4">
                {<Translate value="bus.OperatedBy" />}
                <br />
                {'Class'}
                <br />
                {<Translate value="bus.StartingPoint" />}
                <br />
                {<Translate value="bus.DepartureTime" />}
                <br />
                {<Translate value="bus.ArrivalTime" />}
                <br />
                {<Translate value="bus.AvailableSeats" />}
                <br />
                {<Translate value="bus.TotalPrice" />}
                <br />
      </div>
            <div className="col-4">
                {props.operatorName}
                <br />
                {props.class}
                <br />
                {props.busStop}
                <br />
                {`${props.departTime.split('T')[0]} at ${props.departTime.split('T')[1]}`}
        <br />
                {`${props.arrivalTime.split('T')[0]} at ${props.arrivalTime.split('T')[1]}`}
        {' '}
        <br />
        {props.seatsLeft}
        {' '}
        <br />
        <p className="price">{props.totalPrice}</p>
            </div>
            <div className="col-2">
                <img
                    //width={props.data.img.width}
                    src={props.url}
                />
            </div>
    </div>
  </div>
);
export default Bus;
