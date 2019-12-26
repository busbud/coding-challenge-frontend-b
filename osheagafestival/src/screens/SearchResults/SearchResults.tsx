import React from "react";
import { RouteComponentProps } from "@reach/router";

import Trips from "./Trips";
import Summary from "./Summary";
import Loader from "./../../components/Loader";
import Nav from "./../../components/Nav";

import {
  ITicketSearchResults,
  IDeparturesResults,
  ICity,
  IDeparture
} from "./../../api/ITicket";
import { getFirstTickets, getMoreTickets } from "./../../api/fetchTickets";

type Action =
  | { type: "initSearchSuccess"; results: ITicketSearchResults }
  | { type: "fetchMoreSuccess"; results: IDeparturesResults }
  | { type: "fetchMore" }
  | { type: "error" };

type State = {
  originCity?: ICity;
  destinationCity?: ICity;
  departures: ReadonlyArray<IDeparture>;
  isComplete: boolean;
  isLoading: boolean;
  hasError?: boolean;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "initSearchSuccess":
      return {
        ...state,
        isLoading: false,
        ...action.results
      };
    case "fetchMoreSuccess": {
      const { departures, complete } = action.results;
      return {
        ...state,
        isLoading: false,
        departures: [...state.departures, ...departures],
        isComplete: complete
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
    departures: [],
    hasError: false,
    isComplete: false,
    isLoading: true
  });

  React.useEffect(() => {
    getFirstTickets()
      .then(results => dispatch({ type: "initSearchSuccess", results }))
      .catch(_err => dispatch({ type: "error" }));
  }, []);

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

  return (
    <>
      <Nav />
      <Summary />
      {state.isLoading && state.departures.length === 0 ? (
        <Loader />
      ) : state.hasError ? (
        <div> Error </div>
      ) : state.destinationCity && state.originCity ? (
        <Trips
          destinationCity={state.destinationCity}
          originCity={state.originCity}
          departures={state.departures}
        />
      ) : (
        <div>Error</div>
      )}
    </>
  );
};

export default SearchResults;
