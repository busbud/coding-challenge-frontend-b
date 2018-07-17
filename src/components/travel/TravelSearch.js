import React from "react";
// Third party libraries
import Typography from "@material-ui/core/Typography";
// Components imports
import TravelSelection from "./TravelSelection";
import TravelList from "./TravelList";
// Inner imports
import "./TravelSearch.css";

const TravelSearch = () => (
  <div>
    <div className="travel-search__search-title">
      <Typography variant="title">{"TravelSelection"}</Typography>
    </div>
    <TravelSelection />
    <div className="travel-search__result-title">
      <Typography variant="title">{"TravelList"}</Typography>
    </div>
    <TravelList />
  </div>
);

export default TravelSearch;
