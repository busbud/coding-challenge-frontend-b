import React from "react";
// Components imports
import Introduction from "./Introduction";
import TravelSearch from "./../travel/TravelSearch";
// Inner imports
import "./TravelOshega.css";
import oshegaLogo from "./img/travel-to-oshega.png";

const TravelOshega = () => (
  <main>
    <Introduction
      logo={{ src: oshegaLogo, alt: "pages.travel_oshega.img_alt" }}
      text="pages.travel_oshega.description_text"
    />
    <TravelSearch
      classes={{ travelSearch: "travel-world" }}
      defaultValueTravelSelection={{
        townFrom: "New York",
        townFromGeohash: "dr5reg",
        townTo: "Montreal",
        townToGeohash: "f25dvk",
        date: "2018-08-02"
      }}
    />
  </main>
);

export default TravelOshega;
