import Container from "@mui/material/Container";
import { useCallback } from "react";
import "./App.css";
import Form from "./Form";

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
