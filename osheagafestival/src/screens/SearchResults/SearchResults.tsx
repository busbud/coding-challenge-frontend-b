import React from "react";
import { RouteComponentProps } from "@reach/router";
import styled from "styled-components";

import { greyDark, primary } from "../../assets/Colors";
import { reg } from "../../assets/Spacing";
import * as S from "./../../styledComponents";
import Trips from "./Trips";

import { ITicketSearchResults } from "./../../api/ITicket";
import { getFirstTickets } from "./../../api/fetchTickets";

type Action =
  | { type: "request" }
  | { type: "initSearchSuccess"; results: ITicketSearchResults }
  | { type: "error"; error: string };

type State = {
  data?: ITicketSearchResults;
  isLoading: boolean;
  error?: string;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "request":
      return { ...state, isLoading: true };
    case "initSearchSuccess":
      return { ...state, isLoading: false, data: action.results };
    case "error":
      return { ...state, isLoading: false, error: action.error };
  }
};

const SearchResults: React.FC<RouteComponentProps> = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    isLoading: true
  });

  React.useEffect(() => {
    getFirstTickets()
      .then(data => dispatch({ type: "initSearchSuccess", results: data }))
      .catch(error => dispatch({ type: "error", error }));
  });

  return (
    <>
      <Navbar role="navigation">
        <S.WhiteLink to="/">Home</S.WhiteLink>
        <a>Lang</a>
      </Navbar>
      <Summary>
        <S.Card>
          <Information>
            Your trip from <City>NYC</City> > <City>MTL</City> - August 2nd,
            2020
          </Information>
          <People> 1 Adult </People>
        </S.Card>
      </Summary>
      {state.isLoading ? (
        <div>LOADING</div>
      ) : state.data ? (
        <Trips
          destinationCity={state.data.destinationCity}
          originCity={state.data.originCity}
          departures={state.data.departures}
        ></Trips>
      ) : (
        <div>Error</div>
      )}
    </>
  );
};

const People = styled.div`
  font-weight: 300;
  color: ${greyDark};
  text-align: center;
`;

const City = styled.span`
  color: ${primary};
  font-weight: 600;
`;

const Information = styled.div`
  font-size: 1.2em;
  font-weight: 300;
  text-align: center;
`;

const Summary = styled.div`
  background-image: url("https://www.osheaga.com/uploads/osheaga/backgrounds/Osheaga-homecoming.jpb.jpg?v=67a753a108ff7d65f3d9355c44518fdf");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const Navbar = styled.nav`
  background-color: ${primary};
  padding: ${reg};
  display: flex;
  justify-content: space-between;
  box-shadow: 0px -2px 10px 2px ${greyDark};
`;

export default SearchResults;
