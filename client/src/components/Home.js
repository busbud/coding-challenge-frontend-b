import React, { useState } from "react";
import LocalizedStrings from "react-localization";
import Departure from "./Departure";
import "./Home.scss";

let strings = new LocalizedStrings({
  en: {
    title: "Find your way to Osheaga",
    from: "From",
    to: "To",
    when: "When",
    submit: "Search"
  },
  fr: {
    title: "Trouves ton chemin vers Osheaga",
    from: "Depuis",
    to: "Vers",
    when: "Date",
    submit: "Rechercher"
  }
});

const availableLangs = ["en", "fr"];

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

const DeparturesList = ({ departures, lang }) => (
  <div className="home__departures">
    {departures.map(departure => (
      <Departure key={departure.id} lang={lang} {...departure} />
    ))}
  </div>
);

const Home = () => {
  const [departures, setDepartures] = useState(null);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState("en");

  strings.setLanguage(lang);

  const getDepartures = e => {
    e.preventDefault();
    fetch(
      `https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02?adult=1&lang=${lang}`,
      {
        headers: {
          Accept:
            "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
          "X-Busbud-Token": "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
        }
      }
    )
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

  const changeLanguage = e => {
    const lang = e.target.value;
    setLang(lang);
  };

  return (
    <div className={`home ${departures ? "home--has-departures" : ""}`}>
      <select
        className="home__languages"
        onChange={changeLanguage}
        value={lang}
      >
        {availableLangs.map(language => (
          <option key={language} value={language}>
            {language.toUpperCase()}
          </option>
        ))}
      </select>
      <h1>{strings.title}</h1>
      <form className="home__search" onSubmit={getDepartures}>
        {error && `Error! ${error.message}`}
        <div className="home__search__fields">
          <div className="home__search__fields__input">
            <label htmlFor="from">{strings.from}</label>
            <input
              readOnly
              id="from"
              type="text"
              name="from"
              value="New-York"
            />
          </div>
          <div className="home__search__fields__input">
            <label htmlFor="to">{strings.to}</label>
            <input readOnly id="to" type="text" name="to" value="Montreal" />
          </div>
          <div className="home__search__fields__input">
            <label htmlFor="date">{strings.when}</label>
            <input
              readOnly
              id="when"
              type="text"
              name="when"
              value="08/02/2020"
            />
          </div>
        </div>
        <button className="home__search__submit" type="submit">
          {departures ? <span>&#128269;</span> : strings.submit}
        </button>
      </form>
      {departures && !!departures.length && (
        <DeparturesList departures={departures} lang={lang} />
      )}
    </div>
  );
};

export default Home;
