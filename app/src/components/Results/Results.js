import React from "react";

import DeparturesList from "./../DeparturesList/DeparturesList";

import "./Results.scss";

const Results = ({ list }) => (
  <div id="results">
    <DeparturesList list={list} />
  </div>
);

export default Results;
