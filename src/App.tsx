import Container from "@mui/material/Container";
import { useCallback, useState } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import "./App.css";
import translations from "./translations";
import Form from "./Form";
import Departures from "./Departures";
import type { Search } from "./types";

i18n.use(initReactI18next).init(translations);

function App() {
  const [search, setSearch] = useState<Search | null>(null);
  const onSubmit = useCallback((searchParameters: Search) => {
    setSearch(searchParameters);
  }, []);

  return (
    <Container>
      <div className="App">
        <h1>busbud coding challenge</h1>
        <div>
          <Form onSubmit={onSubmit} />
        </div>
        <div>
          {search !== null && (
            <Departures
              origin={search.origin}
              destination={search.destination}
              date={search.date}
              passengers={search.passengers}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

export default App;
