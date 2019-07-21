import React from "react";
import _ from "lodash";

import DepartureInfo from "../components/DepartureInfo";

export default class DeparturesContainer extends React.Component {
  render() {
    const { data: departures } = this.props;
    return (
      <div className="departures-page-container">
        {_.map(departures, departure => {
          return (
            <DepartureInfo
              departure={departure}
              key={departure.busbud_departure_id}
            />
          );
        })}
      </div>
    );
  }
}
