import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ResultCard from "./ResultCard";
import { TranslationType } from "../lang";

const ResultListWrapper = styled.div`
  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

interface ResultListProps {
  departures?: any;
  locations?: any;
  language: string;
  t: TranslationType;
}

function ResultList(props: ResultListProps) {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (props.departures?.length) {
      const modifiedLocations: Record<number, any> = {};
      props.locations.forEach((lc: any) => {
        modifiedLocations[lc.id] = lc;
      });

      const modifiedDepartures = props.departures.map((d: any) => {
        d["destinationLocationName"] =
          modifiedLocations[d["destinationLocationId"]].name;
        d["originLocationName"] = modifiedLocations[d["originLocationId"]].name;

        return d;
      });

      setRoutes(modifiedDepartures);
    }
  }, [props.departures]);

  return (
    <ResultListWrapper>
      <div className="title">{props.t.resultList}</div>
      {routes.length === 0 ? (
        <div>No result</div>
      ) : (
        routes.map((route: any) => <ResultCard key={route.id} {...route} />)
      )}
    </ResultListWrapper>
  );
}

export default ResultList;
