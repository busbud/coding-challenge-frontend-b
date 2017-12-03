import React from "react";
import DepartureList from "./DepartureList";

const MainSection = props => {

  return (
    <div className="section container is-widescreen is-paddingless">
      <DepartureList departures={props.departures}/>
    </div>
  );
};

export default MainSection;
