import React, { useState } from "react";
import Departure from "./Departure";

import "./Home.scss";

const formatDeparture = ({ cities, departures }) => {
  return departures.map(
    ({
      arrival_time,
      available_seats,
      complete,
      departure_time,
      duration,
      id,
      prices,
      ...departure
    }) => ({
      from: cities[0].name,
      to: cities[1].name,
      arrival_time,
      available_seats,
      seatClass: departure.class,
      complete,
      departure_time,
      duration:
        Math.floor(duration / 60) + ":" + ("0" + (duration % 60)).slice(-2),
      id,
      prices
    })
  );
};

const DeparturesList = ({ departures }) => (
  <div className="home__departures">
    {departures.map(departure => (
      <Departure key={departure.id} {...departure} />
    ))}
  </div>
);

const Home = () => {
  const [departures, setDepartures] = useState(null);
  const [error, setError] = useState(null);

  const getDepartures = e => {
    e.preventDefault();
    fetch("https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02", {
      headers: {
        Accept:
          "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
      }
    })
      .then(res => res.json())
      .then(
        result => {
          const departures = formatDeparture(result);
          setDepartures(departures);
        },
        error => {
          setError(error);
        }
      );
  };

  return (
    <div className="home">
      <h1>Find your way to Osheaga</h1>
      {departures ? (
        <DeparturesList departures={departures} />
      ) : (
        <form className="home__search" onSubmit={getDepartures}>
          {error && `Error! ${error.message}`}
          <div className="home__search__fields">
            <div className="home__search__fields__input">
              <label htmlFor="from">From</label>
              <input
                readOnly
                id="from"
                type="text"
                name="from"
                value="New-York"
              />
            </div>
            <div className="home__search__fields__input">
              <label htmlFor="to">To</label>
              <input readOnly id="to" type="text" name="to" value="Montreal" />
            </div>
            <div className="home__search__fields__input">
              <label htmlFor="date">When</label>
              <input
                readOnly
                id="when"
                type="text"
                name="when"
                value="08/02/2020"
              />
            </div>
          </div>
          <input
            className="home__search__submit"
            type="submit"
            value="Search"
          />
        </form>
      )}
    </div>
  );
};

export default Home;
