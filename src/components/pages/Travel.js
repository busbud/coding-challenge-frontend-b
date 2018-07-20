import React from "react";
// Components imports
import Introduction from "./Introduction";
import TravelSearch from "./../travel/TravelSearch";
// Inner imports
import "./Travel.css";
import oshegaLogo from "./img/world-map.png";

const Travel = () => (
  <main>
    <Introduction
      logo={{
        src: oshegaLogo,
        alt: "pages.travel.img_alt",
        className: "travel__logo--max-height"
      }}
      text="pages.travel.description_text"
    />
    <TravelSearch classes={{ travelSearch: "travel-world" }} />
  </main>
);

export default Travel;
