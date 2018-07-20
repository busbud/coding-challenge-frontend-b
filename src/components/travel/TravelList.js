import React, { Component } from "react";
import PropTypes from "prop-types";
// Third party libraries
// Components imports
import Journey, { JourneyPropTypes } from "./Journey";
// Inner imports
import "./TravelList.css";

class TravelList extends Component {
  render() {
    const { journeys } = this.props;

    return (
      <div className="travel-list">
        <div className="travel-list__container-center">
          {journeys.map(journey => (
            <Journey key={journey.id} journey={journey} />
          ))}
        </div>
      </div>
    );
  }
}

TravelList.propTypes = {
  journeys: PropTypes.arrayOf(JourneyPropTypes)
};

export default TravelList;
