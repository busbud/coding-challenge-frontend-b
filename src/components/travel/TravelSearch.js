import React from "react";
// Third party libraries
import Typography from "@material-ui/core/Typography";
import Translate from "react-translate-component";
// Components imports
import TravelSelection from "./TravelSelection";
import TravelList from "./TravelList";
// Inner imports
import "./TravelSearch.css";

const TravelSearch = () => (
  <div>
    <div className="travel-search__search-title">
      <Typography variant="title">
        <Translate content="travel.search.selection_title" />
      </Typography>
    </div>
    <TravelSelection />
    <div className="travel-search__result-title">
      <Typography variant="title">
        <Translate content="travel.search.result_title" />
      </Typography>
    </div>
    <TravelList />
  </div>
);

export default TravelSearch;
