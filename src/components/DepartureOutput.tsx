import React, { FC, useState } from "react";
import DepartureCard from "./DepartureCard";
import Fade from "react-reveal/Fade";

interface Props {
  searchResult: DepartureSearchResponse;
}

const DepartureOutput: FC<Props> = ({ searchResult }) => {
  const departuresFound = (
    <div className="flex flex-col items-center">
      <Fade>
        {searchResult.departures.map((d, i) => (
          <DepartureCard
            key={i}
            departure={d}
            cities={searchResult.cities}
            locations={searchResult.locations}
            operators={searchResult.operators}
          />
        ))}
      </Fade>
    </div>
  );

  const departuresNotFound = (
    <p className="text-center text-bb-blue font-bold">
      Sorry, no departures found for that date!
    </p>
  );

  const output =
    searchResult.departures.length > 0 ? departuresFound : departuresNotFound;

  return <div className="sm:p-6">{output}</div>;
};

export default DepartureOutput;
