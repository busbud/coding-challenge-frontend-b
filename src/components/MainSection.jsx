import React from "react";
import DepartureList from "./DepartureList";
import Loading from './Loading'
import "./MainSection.css"
import utils from "../utils/utils";

const MainSection = props => {

  const originCity = utils.geohashToName(props.currentSearch.origin);
  const destinationCity = utils.geohashToName(props.currentSearch.destination);
  const date = props.currentSearch.date.toLocaleDateString("fr");
  return (
    <div className="MainSection section container is-paddingless">
      <div className="description is-hidden-mobile">
        {`Departures from ${originCity} to ${destinationCity} on ${date}`}
      </div>
      <div className="description is-hidden-tablet">
        <p>{`${originCity} to ${destinationCity}`}</p>
        <p>{`${date}`}</p>
      </div>
      { props.isLoading ? <Loading /> : (
        <div>
          <DepartureList departures={props.departures}/>
        </div>
      )}
      { props.error && (
        <div className="notification is-danger">
          <p>{ props.error }</p>
        </div>
      )}
    </div>
  );
};

export default MainSection;
