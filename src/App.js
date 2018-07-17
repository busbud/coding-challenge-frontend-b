import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Components imports
import DefaultLayout from "./components/DefaultLayout";
import TravelOshega from "./components/pages/TravelOshega";
import Travel from "./components/pages/Travel";
// Inner imports
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <DefaultLayout exact path="/" component={TravelOshega} />
          <DefaultLayout path="/travel" component={Travel} />
        </div>
      </Router>
    );
  }
}

export default App;
