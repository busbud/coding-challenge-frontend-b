import React from "react";
import DepartureItem from "./DepartureItem"
import "./DepartureList.css";

const DepartureList = props => {

  const items = props.departures.map((departureInfo, idx) => {
    return (
      <DepartureItem
        key={idx}
        departureTime={departureInfo.departureTime.toString()}
        arrivalTime={departureInfo.arrivalTime.toString()}
        origin={departureInfo.origin}
        destination={departureInfo.destination}
        price={departureInfo.price}
        currency={departureInfo.currency}
      />
    );
  });
  return (
    <div className="DepartureList">
        {items}
    </div>
  );
};

export default DepartureList;