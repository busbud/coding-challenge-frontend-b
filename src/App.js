import React from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

import axios from "axios";
import { pollUntilFetchFinished } from "./services/fetch-departure-service";

import {
  DeparturesContainer,
  HomeContainer,
  HeaderContainer
} from "./containers";

const URL =
  "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-08-10/poll";

const headers = {
  Accept:
    "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
  "X-Busbud-Token": `${process.env.X_BUSBUD_TOKEN}`
};

let prevNum = 0;
function getIndex(num) {
  prevNum = prevNum + num;
  return prevNum;
}

let newArr = [];
function arrayToContenate(departures) {
  newArr = _.concat(newArr, departures);
  return newArr;
}

class App extends React.Component {
  state = {
    data: {},
    errorMessage: ""
  };

  clickToViewDepartures = () => {
    this.pollUntilFetchFinished();
    this.props.history.push("/departures");
  };

  pollUntilFetchFinished = async (index = 0) => {
    try {
      const fetchResponse = await axios({
        method: "get",
        url: `${URL}?index=${index}`,
        headers
      });

      const {
        data: { complete, departures, locations, operators }
      } = fetchResponse;

      let newDepartures = arrayToContenate(departures);
      console.log(newDepartures);
      if (!complete) {
        const numOfDepartures = getIndex(departures.length);
        setTimeout(() => pollUntilFetchFinished(numOfDepartures), 500);
      } else {
        this.setState({
          ...this.state,
          data: { newDepartures, locations, operators }
        });
      }
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "Failed to fetch"
      });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div className="full-height-layout">
        <header className="app-header">
          <HeaderContainer {...this.props} />
        </header>
        <main className="app-main">
          <Switch>
            <Route
              exact
              path="/departures"
              render={props => <DeparturesContainer {...props} data={data} />}
            />
            <Route
              exact
              path="/"
              render={props => (
                <HomeContainer
                  {...props}
                  onClick={this.clickToViewDepartures}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
