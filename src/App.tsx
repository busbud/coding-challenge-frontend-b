import Container from "@mui/material/Container";
import { useCallback } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import "./App.css";
import translations from "./translations";
import Form from "./Form";

i18n.use(initReactI18next).init(translations);

function App() {
  const onSubmit = useCallback(() => {}, []);

  return (
    <Container>
      <div className="App">
        <h1>busbud coding challenge</h1>
        <div>
          <Form onSubmit={onSubmit} />
        </div>
      </div>
    </Container>
  );
}

export default App;
