import React, { useState } from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import "./Home.scss";

const GET_DEPARTURES = gql`
  query Departures($from: String!, $to: String!, $when: String!) {
    departures(when: $when, to: $to, from: $from) {
      departure_time
      arrival_time
      location
      price
    }
  }
`;

const Home = () => {
  const [departures, setDepartures] = useState(null);
  const [getDepartures, { loading, data, error }] = useLazyQuery(
    GET_DEPARTURES
  );

  if (loading) return <p>"Loading..."</p>;

  if (data && data.departures) {
    setDepartures(data.departures);
  }

  return (
    <div className="home">
      <h1>Find your way to Osheaga</h1>
      <form
        className="home__search"
        onSubmit={getDepartures({
          variables: {
            from: "dr5reg",
            to: "f25dvk",
            when: new Date("08/02/2020").toISOString().split("T", 1)[0]
          }
        })}
      >
        {error && `Error! ${error.message}`}
        <div className="home__search__fields">
          <div className="home__search__fields__input">
            <label htmlFor="from">From</label>
            <input id="from" type="text" name="from" value="New-York" />
          </div>
          <div className="home__search__fields__input">
            <label htmlFor="to">To</label>
            <input id="to" type="text" name="to" value="Montreal" />
          </div>
          <div className="home__search__fields__input">
            <label htmlFor="date">When</label>
            <input id="when" type="text" name="when" value="08/02/2020" />
          </div>
        </div>
        <input className="home__search__submit" type="submit" value="Search" />
      </form>
      {departures && (
        <div>
          {departures.map(departure => (
            <div>{departure.departure_time}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
