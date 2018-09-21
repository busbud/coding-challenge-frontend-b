import React, { Component } from "react";
import { translate }        from "react-i18next";

import Departure from "./Departure";

class DepartureListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: {
        name:   "New York",
        geohash: "dr5reg"
      },
      destination: {
        name:    "Montreal",
        geohash: "f25dvk"
      }
    };
  }

  componentDidMount() {
    this.fetchDepartures(
      this.state.origin.geohash,
      this.state.destination.geohash,
      "August 2, 2019",
      "adults=1"
    );
  }

  fetchDepartures(origin, destination, outboundDate, queryString = "") {
    outboundDate = new Date(outboundDate).toISOString().split("T")[0]; // split the date string and the time string
    if(queryString.charAt(0) === "?") { queryString = queryString.substr(1); }

    let url = `https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}?${queryString}`;
    fetch(url, {
      method: "GET",
      headers: {
        "X-Busbud-Token": "PARTNER_AHm3M6clSAOoyJg4KyCg7w", // Should be sorted in an .env I had isses with heroku
        "Accept":         "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/"
      }
    })
    .then(response => { return response.json(); })
    .then(data => {
      let departures = [];

      data.departures.forEach(departureData => {
        let departure = {
          id: departureData.id,
          departureTime: `${departureData.departure_time}`,
          arrivalTime: `${departureData.arrival_time}`,
          location: data.locations.find((location) => { return departureData.origin_location_id === location.id }),
          price: `${departureData.prices.total}`,
        }
        departures.push(departure)
      })

      this.setState({ departures })
    })
    .catch(error => console.error("fetching failed", error));
  }


  render() {
    const { t } = this.props;
    return (
      <div className="departure-list">
        <h1 className="title">{ t("departureList.h1", {from: this.state.origin.name, to: this.state.destination.name}) }</h1>
        <div className="departure-list-wrapper flex flex-wrap">
          {this.state.departures ? this.state.departures.map((departure) => {
              return <Departure key={departure.id} departure={departure} />;
            }) : (
            <div className="departure-list-empty">
              <h3>{ t("departureList.empty") }</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default translate("common")(DepartureListContainer);