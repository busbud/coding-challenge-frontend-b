import React from "react";
import _ from "lodash";
import axios from "axios";

import { getCurrentLanguage } from "../services/language-service";
import { filterOutDuplicateData } from "../utils/format-departures-data-helper";
import DepartureInfo from "../components/DepartureInfo";
import Placeholder from "../components/Placeholder";

const URL =
  "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-08-04/poll";

const headers = {
  Accept:
    "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
  "X-Busbud-Token": `${process.env.X_BUSBUD_TOKEN}`
};

const FETCH_INTERVAL = 3000;

export default class DeparturesContainer extends React.Component {
  state = {
    data: {
      departures: [],
      operators: [],
      locations: []
    },
    errorMessage: "",
    isFetching: true
  };

  scheduleFetchingDepartures = async () => {
    this.fetchDepartures();
    this.pollingDepratureInterval = setInterval(() => {
      this.fetchDepartures();
    }, FETCH_INTERVAL);
  };

  clearFetchingInterval = async () => {
    clearInterval(this.pollingDepratureInterval);
  };

  componentDidMount() {
    this.scheduleFetchingDepartures();
  }

  componentWillUnmount() {
    this.clearFetchingInterval();
  }

  fetchDepartures = async () => {
    const language = getCurrentLanguage();

    try {
      const index = this.state.data.departures.length;
      const fetchResponse = await axios({
        method: "get",
        url: `${URL}?index=${index}&lang=${language}`,
        headers
      });

      const { complete } = fetchResponse.data;

      this.setState({
        ...this.state,
        isFetching: true,
        data: this.concatDataToState(fetchResponse.data)
      });

      if (complete) {
        this.clearFetchingInterval();
      }
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "Failed to fetch"
      });
    }
  };

  concatDataToState = ({ departures, locations, operators }) => {
    const {
      data: {
        departures: stateDepartures,
        locations: stateLocations,
        operators: stateOperators
      }
    } = this.state;

    return {
      departures: _.concat(stateDepartures, departures),
      locations: _.concat(
        stateLocations,
        filterOutDuplicateData(stateLocations, locations)
      ),
      operators: _.concat(
        stateOperators,
        filterOutDuplicateData(stateOperators, operators)
      )
    };
  };

  render() {
    const {
      data: { departures, locations },
      isFetching
    } = this.state;

    return (
      <div className="departures-page-container">
        {_.map(departures, departure => {
          return (
            <DepartureInfo
              departure={departure}
              key={departure.busbud_departure_id}
              locations={locations}
            />
          );
        })}
      </div>
    );
  }
}
