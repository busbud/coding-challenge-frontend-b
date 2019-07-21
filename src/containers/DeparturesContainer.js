import React from "react";
import _ from "lodash";
import axios from "axios";

import { getCurrentLanguage } from "../services/language-service";
import DepartureInfo from "../components/DepartureInfo";
import Placeholder from "../components/Placeholder";

const URL =
  "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-08-08/poll";

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

      const { complete, departures } = fetchResponse.data;

      if (complete) {
        this._asyncRequest = null;
        return this.setState({
          ...this.state,
          isFetching: false,
          data: this.formatData(fetchResponse.data)
        });
      }

      setTimeout(() => this.fetchDepartures(getIndex(departures.length)), 2000);
      this.setState({
        ...this.state,
        isFetching: true,
        data: this.formatData(fetchResponse.data)
      });
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: "Failed to fetch"
      });
    }
  };

  formatData = ({ departures, locations, operators }) => {
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
        this.filterOutDuplicateData(stateLocations, locations)
      ),
      operators: _.concat(
        stateOperators,
        this.filterOutDuplicateData(stateOperators, operators)
      )
    };
  };

  filterOutDuplicateData = (stateData, data) => {
    return _.filter(data, el => {
      if (!_.some(stateData, stateEL => el.id === stateEL.id)) {
        return el;
      }
    });
  };

  render() {
    const {
      data: { departures, locations },
      isFetching
    } = this.state;

    if (isFetching) {
      return <Placeholder content="Fetching..." />;
    }
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
