import React, { Component } from "react";
// import PropTypes from "prop-types";
// Third party libraries
// Components imports
import Journey from "./Journey";
// Inner imports
import "./TravelList.css";

// TMP
import fakeData from "./fakeData";

class TravelList extends Component {
  state = {
    xDepartures: fakeData
  };

  // state = {
  //   xDepartures: {
  //     departures: []
  //   }
  // };

  render() {
    const { xDepartures } = this.state;
    console.log(xDepartures);

    const data = {
      id: 213,
      departureTime: "2132113",
      originLocation: "fhfgh",
      arrivalTime: "456546546",
      destinationLocation: "hfghgfhfh",
      prices: 10245
    };

    return (
      <div className="travel-list">
        <div className="travel-list__container-center">
          {xDepartures.departures.map(journey => (
            <Journey key={journey.id} journey={data} />
          ))}
        </div>
      </div>
    );
  }
}

// TravelList.propTypes = {
//   journeys: PropTypes
// };

export default TravelList;
