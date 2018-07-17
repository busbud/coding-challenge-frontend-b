import React from "react";
// Third party libraries
import Typography from "@material-ui/core/Typography";
import Translate from "react-translate-component";
// Components imports
import TravelSearch from "./../travel/TravelSearch";
// Inner imports
import "./Travel.css";

const Travel = () => (
  <main>
    <div className="travel__title">
      <Typography variant="headline">
        <Translate content="pages.travel.title" />
      </Typography>
    </div>
    <TravelSearch />
  </main>
);

export default Travel;
