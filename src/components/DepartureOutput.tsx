import React, { FC } from "react";
import DepartureCard from "./DepartureCard";
import Fade from "react-reveal/Fade";

interface Props {
  searchResult: DepartureSearchResponse;
}

const DepartureOutput: FC<Props> = ({ searchResult }) => {
  const departuresLength = searchResult.departures.length;

  const successMessage = (
    <p className="text-bb-blue font-semibold mb-4">
      Found {departuresLength} departure{departuresLength > 1 && "s"} for the
      above date.
    </p>
  );

  const caseDeparturesFound = (
    <div className="flex flex-col items-center">
      <Fade>
        <>
          {successMessage}
          {searchResult.departures.map((d, i) => (
            <DepartureCard
              key={i}
              departure={d}
              cities={searchResult.cities}
              locations={searchResult.locations}
              operators={searchResult.operators}
            />
          ))}
        </>
      </Fade>
    </div>
  );

  const caseDeparturesNotFound = (
    <p className="text-center text-bb-blue font-bold">
      Sorry, no departures found for that date!
    </p>
  );

  const output =
    searchResult.departures.length > 0
      ? caseDeparturesFound
      : caseDeparturesNotFound;

  return <div className="sm:p-6">{output}</div>;
};

export default DepartureOutput;
