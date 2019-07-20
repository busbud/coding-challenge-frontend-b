import React from "react";
import _ from "lodash";

const mockData = [
  {
    id: "1234",
    departureTime: "12:01",
    departureLocation: "New York",
    arrivalTime: "13:00",
    arrivalLocation: "Montreal",
    price: "23.45",
    duration: "23h 21min - 1 stop"
  }
];

export default class DeparturesContainer extends React.Component {
  render() {
    return (
      <div className="departures-page-container">
        {_.map(mockData, el => {
          const {
            id,
            departureTime,
            departureLocation,
            arrivalTime,
            arrivalLocation,
            price,
            duration
          } = el;
          return (
            <div className="departure-info-container" key={id}>
              <div className="schedule-info">
                <div className="column operator-logo" />
                <div className="column">
                  <div className="time">Departure {departureTime}</div>
                  <div className="location">{departureLocation}</div>
                </div>
                <div className="column">
                  <div className="time">Arrival {arrivalTime}</div>
                  <div className="location">{arrivalLocation}</div>
                </div>
              </div>
              <div className="schedule-details">
                <div className="column">
                  <div className="duration">
                    <i class="fa fa-clock-o" />
                    {duration}
                  </div>
                </div>
                <div className="column price">${price} USD</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
