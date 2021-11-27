import Container from "@mui/material/Container";
import { useMachine } from "@xstate/react";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useCallback } from "react";
import { initReactI18next } from "react-i18next";
import "./App.css";
import Departures from "./components/Departures";
import Form from "./components/Form";
import { Header } from "./components/Header";
import translations from "./libs/translations";
import fetchDeparturesMachile from "./machines/fetch-departures";
import type { Search } from "./types";

i18n.use(initReactI18next).use(LanguageDetector).init(translations);

function App() {
  const [current, send] = useMachine(fetchDeparturesMachile);
  const onSubmit = useCallback(
    (searchParameters: Search) => {
      send({
        type: "INITIALIZE",
        adults: searchParameters.passengers,
        date: searchParameters.date,
        origin: searchParameters.origin,
        destination: searchParameters.destination,
      });
    },
    [send]
  );

  return (
    <Container>
      <div className="App">
        <Header />
        <Form onSubmit={onSubmit} />
        <Departures
          departures={current.context.departures}
          locations={current.context.locations}
          loading={
            current.matches("initializing") || current.matches("polling")
          }
          hasError={current.matches("failure")}
        />
      </div>
    </Container>
  );
}

export default App;
