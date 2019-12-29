import React from "react";
import { RouteComponentProps } from "@reach/router";
import styled from "styled-components";

import Trips from "../../components/Trip/Trips";
import Summary from "./Summary";
import Loader from "./../../components/Loader";
import Nav from "./../../components/Nav";
import { greyLight } from "../../assets/Colors";

import { ITrips, IDepartures } from "./../../api/ITicket";
import { getFirstTickets, getMoreTickets } from "./../../api/fetchTickets";

type Action =
  | { type: "initSearchSuccess"; results: ITrips }
  | { type: "fetchMoreSuccess"; results: IDepartures }
  | { type: "fetchMore" }
  | { type: "error" };

type State = {
  data: ITrips | null;
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
      const { departures, isComplete, locations, operators } = action.results;
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data!, // ??
          departures: [...state.data!.departures, ...departures],
          locations: new Map([
            ...Array.from(state.data!.locations.entries()),
            ...Array.from(locations.entries())
          ]),
          operators: new Map([
            ...Array.from(state.data!.operators.entries()),
            ...Array.from(operators.entries())
          ]),
          isComplete: isComplete
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

  const initSearch = () => {
    getFirstTickets()
      .then(results => dispatch({ type: "initSearchSuccess", results }))
      .catch(_err => dispatch({ type: "error" }));
  };

  const loadMore = (index: number) => {
    dispatch({ type: "fetchMore" });
    getMoreTickets(index)
      .then(results => dispatch({ type: "fetchMoreSuccess", results }))
      .catch(err => {
        console.log(err);
        dispatch({ type: "error" });
      });
  };

  React.useEffect(initSearch, []);

  React.useEffect(() => {
    if (!state.data && !state.isLoading) {
      setTimeout(initSearch, 2000);
    } else if (state.data && !state.data.isComplete && !state.isLoading) {
      setTimeout(() => loadMore(state.data!.departures.length), 2000);
    }
  }, [state.isLoading, state.data]);

  return (
    <Container>
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
    </Container>
  );
};

const Container = styled.div`
  background-color: ${greyLight};
`;

export default SearchResults;
