import React, { useState, useEffect, useRef } from "react";
import LocalizedStrings from "react-localization";
import Departure from "./Departure";
import SubmitButton from "./SubmitButton";
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

const Home = () => {
  const [departures, setDepartures] = useState(null);
  const [status, setStatus] = useState({});
  const [lang, setLang] = useState("en");
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      strings.setLanguage(lang);
      getDepartures();
    }
  }, [lang]);

  const getDepartures = e => {
    e && e.preventDefault();
    fetch(
      `https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02${
        status.name === "polling" ? "/poll" : ""
      }?adult=1&lang=${lang}${departures ? `&index=${departures.length}` : ""}`,
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
          if (result.complete) {
            setStatus({ name: "completed" });
            setDepartures(formatDeparture(result));
          } else {
            setStatus({ name: "polling" });
            setDepartures(departures);
            getDepartures();
          }
        },
        error => {
          setStatus({ name: "error", message: error });
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
        {status.name === "error" && `Error! ${status.message}`}
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
        <SubmitButton loading={status.name === "polling"}>
          {departures ? <span>&#128269;</span> : strings.submit}
        </SubmitButton>
      </form>
      {departures && !!departures.length && (
        <div className="home__departures">
          {departures.map(departure => (
            <Departure key={departure.id} lang={lang} {...departure} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
