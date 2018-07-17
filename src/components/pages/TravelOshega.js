import React from "react";
// Third party libraries
import Typography from "@material-ui/core/Typography";
import Translate from "react-translate-component";
// Inner imports
import "./TravelOshega.css";

const TravelOshega = () => (
  <main>
    <div className="travel-oshega__title">
      <Typography variant="headline">
        <Translate content="pages.travel_oshega.title" />
      </Typography>
    </div>
  </main>
);

export default TravelOshega;
