import React from "react";
import DepartureList from "./DepartureList";
import "./MainSection.css"

const MainSection = props => {

  const currentSearch = props.currentSearch;
  return (
    <div className="MainSection section container is-widescreen is-paddingless">
      <div className="description is-hidden-mobile">
        {`Departures from ${currentSearch.origin} to ${currentSearch.destination} on ${currentSearch.date}`}
      </div>
      <div className="description is-hidden-tablet">
        <p>{`${currentSearch.origin} to ${currentSearch.destination}`}</p>
        <p>{`${currentSearch.date}`}</p>
      </div>
      <div>
        <DepartureList departures={props.departures}/>
      </div>
    </div>
  );
};

export default MainSection;
