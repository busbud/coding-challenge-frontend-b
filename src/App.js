import React, { StrictMode } from "react";
import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import { createBrowserHistory } from "history";
import { HomePage } from "./pages/HomePage";

const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <StrictMode>
        <Switch>
          <Route path="*" component={HomePage} />
        </Switch>
      </StrictMode>
    </Router>
  );
}

export default App;
