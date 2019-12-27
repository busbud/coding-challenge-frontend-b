import React from "react";
import { RouteComponentProps } from "@reach/router";

import Trips from "./Trips";
import Summary from "./Summary";
import Loader from "./../../components/Loader";
import Nav from "./../../components/Nav";

import { IDeparturesResults } from "./../../api/ITicket";
import { getFirstTickets } from "./../../api/fetchTickets";

type Action =
  | { type: "initSearchSuccess"; results: IDeparturesResults }
  | { type: "fetchMoreSuccess"; results: IDeparturesResults }
  | { type: "fetchMore" }
  | { type: "error" };

type State = {
  data: IDeparturesResults | null;
  /* departures: ReadonlyArray<IDeparture>;
  operators: IOperators | null;
  locations: ILocations | null;
  originCity: ICity | null;
  arrivalCity: ICity | null;*/
  isLoading: boolean;
  hasError: boolean;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "initSearchSuccess":
      return {
        ...state,
        isLoading: false,
        data: action.results
      };
    case "fetchMoreSuccess": {
      const { departures } = action.results;
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data!, // ??
          departures: [...state.data!.departures, ...departures]
        }
      };
    }
    case "fetchMore":
      return { ...state, isLoading: true };
    case "error":
      return { ...state, isLoading: false, hasError: true };
  }
};

const SearchResults: React.FC<RouteComponentProps> = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    data: null,
    hasError: false,
    isLoading: true
  });

  React.useEffect(() => {
    getFirstTickets()
      .then(results => dispatch({ type: "initSearchSuccess", results }))
      .catch(_err => dispatch({ type: "error" }));
  }, []);

  /*
  React.useEffect(() => {
    const loadMore = () => {
      dispatch({ type: "fetchMore" });
      getMoreTickets(state.departures.length)
        .then(results => dispatch({ type: "fetchMoreSuccess", results }))
        .catch(_err => dispatch({ type: "error" }));
    };

    if (!state.isComplete && !state.isLoading) {
      setTimeout(loadMore, 2000);
    }
  }, [state.departures.length, state.isLoading, state.isComplete]);
*/

  return (
    <>
      <Nav />
      <Summary />
      {state.isLoading && state.data === null ? (
        <Loader />
      ) : state.hasError ? (
        <div> Error </div>
      ) : (
        <Trips
          departures={state.data!.departures}
          operators={state.data!.operators}
          locations={state.data!.locations}
          originCity={state.data!.originCity}
          arrivalCity={state.data!.arrivalCity}
        />
      )}
    </>
  );
};

export default SearchResults;
