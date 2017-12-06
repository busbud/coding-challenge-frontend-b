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

  const emptyList = (
    <div className='notification'>
      <p>No departures found</p>
    </div>
  );

  return (
    items.length === 0 ? emptyList : (
      <div className="DepartureList">
        {items}
      </div>
    )
  );
};

export default DepartureList;
