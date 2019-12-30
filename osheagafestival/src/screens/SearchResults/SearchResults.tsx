import React from "react";
import { RouteComponentProps } from "@reach/router";
import styled from "styled-components";

import { IntlContext } from "../../i18n/IntlContext";
import Trips from "../../components/Trip/Trips";
import Summary from "./Summary";
import Loader from "./../../components/Loader";
import Error from "./../../components/Error";
import Nav from "./../../components/Nav";
import { greyLight } from "../../assets/Colors";

import { concatMap } from "./../../utils";
import { ILocation, IOperator, ITrips, IDepartures } from "./../../api/ITicket";
import { getFirstTickets, getMoreTickets } from "./../../api/fetchTickets";

type Action =
  | { type: "initSearchSuccess"; results: ITrips }
  | { type: "fetchMoreSuccess"; results: IDepartures }
  | { type: "error" };

type State = {
  data: ITrips | null;
  isLoading: boolean;
  hasError: boolean;
};

const defaultState: State = { data: null, hasError: false, isLoading: true };

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
          ...state.data!,
          departures: [...state.data!.departures, ...departures],
          locations: concatMap<ILocation>(state.data!.locations, locations),
          operators: concatMap<IOperator>(state.data!.operators, operators),
          isComplete: isComplete
        }
      };
    }
    case "error":
      return { ...state, isLoading: false, hasError: true };
  }
};

const isDataReady = (data: ITrips | null) => data && data.departures.length > 0;

const initSearch = (dispatch: (a: Action) => void, lang: string) => {
  getFirstTickets(lang)
    .then(results => dispatch({ type: "initSearchSuccess", results }))
    .catch(_err => dispatch({ type: "error" }));
};

const loadMore = (
  dispatch: (a: Action) => void,
  lang: string,
  index: number
) => {
  getMoreTickets(lang, index)
    .then(results => dispatch({ type: "fetchMoreSuccess", results }))
    .catch(_err => {
      dispatch({ type: "error" });
    });
};

const SearchResults: React.FC<RouteComponentProps> = () => {
  const intlContext = React.useContext(IntlContext);
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  React.useEffect(() => initSearch(dispatch, intlContext.lang), [
    intlContext.lang
  ]);

  React.useEffect(() => {
    if (!state.data && !state.isLoading) {
      setTimeout(() => initSearch(dispatch, intlContext.lang), 2000);
    } else if (state.data && !state.data.isComplete && !state.isLoading) {
      setTimeout(
        () =>
          loadMore(dispatch, intlContext.lang, state.data!.departures.length),
        2000
      );
    }
  }, [state.isLoading, intlContext.lang, state.data]);

  return (
    <Container>
      <Nav />
      <Summary />
      {(state.isLoading && !state.data) || !isDataReady(state.data) ? (
        <Loader />
      ) : state.hasError ? (
        <Error onRetry={() => initSearch(dispatch, intlContext.lang)} />
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
  min-height: 100vh;
`;

export default SearchResults;
