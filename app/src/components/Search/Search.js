import React from "react";

import { withDepartures } from "../../hoc/withDepartures";
import { getFormatedDate } from "./../../utils/helper"

import "./Search.scss";

const Search = ({ cities, params }) => {
  return (
    <div className="search">
      <div className="search__from">
        <span className="search__label">From: </span>
        <div className="search__value">{cities && cities.origin_city.name}</div>
      </div>
      <div className="search__to">
        <span className="search__label">To: </span>
        <div className="search__value">{cities && cities.destination_city.name}</div>
      </div>
      <div className="search__outbound-date">
        <span className="search__label">Outbound date: </span>
        <div className="search__value">{getFormatedDate(params.urlParams.outbound_date)}</div>
      </div>
      <div className="search__passengers">
        <span className="search__label">Passengers :</span>
        <div className="search__value">
          <div className="search__passengers-adult">{`${params.searchParams.adult} adult`}</div>
          <div className="search__passengers-child">{`${params.searchParams.child} child`}</div>
          <div className="search__passengers-senior">{`${params.searchParams.senior} senior`}</div>
        </div>
      </div>
    </div>)
};

export default withDepartures(Search);
