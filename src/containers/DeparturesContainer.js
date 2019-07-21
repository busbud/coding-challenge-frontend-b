import React from "react";
import _ from "lodash";
import axios from "axios";

import { formatDeparturesData } from "../utils/format-departures-data-helper";
import { getCurrentLanguage } from "../services/language-service";
import DepartureInfo from "../components/DepartureInfo";

const URL =
  "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-08-11/poll";

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

let newArrD = [];
function arrayToContenate(data) {
  newArrD = _.concat(newArrD, data);
  return newArrD;
}

let newArrL = [];
function arrayToContenateLocations(data) {
  newArrL = _.concat(newArrL, data);
  return newArrL;
}

let newArrO = [];
function arrayToContenateOperators(data) {
  newArrO = _.concat(newArrO, data);
  return newArrO;
}

export default class DeparturesContainer extends React.Component {
  state = {
    data: {},
    errorMessage: "",
    isFetching: true
  };

  componentDidMount() {
    this._asyncRequest = this.fetchDepartures();
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  fetchDepartures = async (index = 0) => {
    const language = getCurrentLanguage();

    try {
      const fetchResponse = await axios({
        method: "get",
        url: `${URL}?index=${index}&lang=${language}`,
        headers
      });

      const {
        data: { complete, departures, locations, operators }
      } = fetchResponse;

      let newDepartures = arrayToContenate(departures);
      console.log("newDepartures", newDepartures);

      let newLocations = arrayToContenateLocations(locations);
      let newOperators = arrayToContenateOperators(operators);

      if (!complete) {
        const numOfDepartures = getIndex(departures.length);
        setTimeout(() => this.fetchDepartures(numOfDepartures), 2000);
        this.setState({ ...this.state, isFetching: true });
      } else {
        this._asyncRequest = null;
        newLocations = _.uniqBy(newLocations, location => location.id);
        const data = formatDeparturesData({ newDepartures, newLocations });
        this.setState({ ...this.state, data, isFetching: false });
      }
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "Failed to fetch"
      });
    }
  };

  render() {
    const { data: departures, isFetching } = this.state;
    if (isFetching) {
      return (
        <div className="departures-page-container">
          Please wait while we fetch the departures...
        </div>
      );
    }
    return (
      <div className="departures-page-container">
        {_.map(departures, departure => {
          return (
            <DepartureInfo
              departure={departure}
              key={departure.busbud_departure_id}
            />
          );
        })}
      </div>
    );
  }
}
