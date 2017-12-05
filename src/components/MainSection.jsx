import React from "react";
import DepartureList from "./DepartureList";
import "./MainSection.css"
import utils from "../utils/utils";

const MainSection = props => {

  const originCity = utils.geohashToName(props.currentSearch.origin);
  const destinationCity = utils.geohashToName(props.currentSearch.destination);
  const date = props.currentSearch.date.toLocaleDateString("fr");
  return (
    <div className="MainSection section container is-widescreen is-paddingless">
      <div className="description is-hidden-mobile">
        {`Departures from ${originCity} to ${destinationCity} on ${date}`}
      </div>
      <div className="description is-hidden-tablet">
        <p>{`${originCity} to ${destinationCity}`}</p>
        <p>{`${date}`}</p>
      </div>
      <div>
        <DepartureList departures={props.departures}/>
      </div>
    </div>
  );
};

export default MainSection;
