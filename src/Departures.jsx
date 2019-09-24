import React, { Component } from "react";
import { connect } from "react-redux";
import { t, geohashCity } from "./Translations.jsx";

class UnconnectedDepartures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: "",
      outbound_date: "",
      passengers: "",
      travelType: "",
      busResults: {}
    };
  }

  handleOriginChange = event => {
    event.preventDefault();
    let origin;
    console.log("origin", event.target.value);
    if (event.target.value !== undefined) {
      origin = event.target.value;
      this.setState({ origin });
      return;
    }
    origin = Array.from(event.target.selectedOptions)[0].value;
    this.setState({ origin });
  };

  handleDestinationChange = event => {
    event.preventDefault();
    let destination;
    console.log("destination", event.target.value);
    if (event.target.value !== undefined) {
      destination = event.target.value;
      this.setState({ destination });
      return;
    }
    destination = Array.from(event.target.selectedOptions)[0].value;
    this.setState({ destination });
    console.log("this.state.destination", this.state.destination);
  };

  handleOutboundDateChange = event => {
    event.preventDefault();
    this.setState({ outbound_date: event.target.value });
    console.log("outbound_date", this.state.outbound_date);
  };

  handlePassengerChange = event => {
    event.preventDefault();
    let passengers = Array.from(event.target.selectedOptions)[0].value;

    this.setState({ passengers }, () => {
      console.log("this.state.passengers", this.state.passengers);
    });
  };

  handleTravelTypeChange = event => {
    event.preventDefault();
    let travelType = Array.from(event.target.selectedOptions)[0].value;
    console.log("travelType", travelType);
    this.setState({ travelType: this.state.travelType });
  };

  handleSubmit = async event => {
    event.preventDefault();
    let iteration = -1;

    let pollSearch = async () => {
      iteration += 1;
      console.log("iteration", iteration);

      let uri =
        "https://napi.busbud.com/x-departures/" +
        geohashCity(this.state.origin) +
        "/" +
        geohashCity(this.state.destination) +
        "/" +
        this.state.outbound_date +
        "/poll";
      // "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02/poll";
      if (iteration > 1) {
        uri =
          "https://napi.busbud.com/x-departures/" +
          geohashCity(this.state.origin) +
          "/" +
          geohashCity(this.state.destination) +
          "/" +
          this.state.outbound_date +
          "/poll?index=10";
        // "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02/poll?index=10";
      }
      console.log("uri", uri);
      console.log("pollSearch");
      let headers = new Headers();
      headers.append(
        "Accept",
        "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/"
      );
      headers.append("X-Busbud-Token", "PARTNER_AHm3M6clSAOoyJg4KyCg7w");
      let response = await fetch(uri, {
        method: "GET",
        headers: headers,
        mode: "cors"
      });
      let responseBody = await response.text();

      let body = JSON.parse(responseBody);
      console.log("body pollSearch", body);

      this.setState({ busResults: body });
      this.props.dispatch({
        type: "fetch-departures-done",
        busResults: this.state.busResults
      });
    };

    let headers = new Headers();
    headers.append(
      "Accept",
      "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/"
    );
    headers.append("X-Busbud-Token", "PARTNER_AHm3M6clSAOoyJg4KyCg7w");

    let uri =
      "https://napi.busbud.com/x-departures/" +
      geohashCity(this.state.origin) +
      "/" +
      geohashCity(this.state.destination) +
      "/" +
      this.state.outbound_date;
    // "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02";
    console.log("uri", uri);

    let response = await fetch(uri, {
      method: "GET",
      headers: headers,
      mode: "cors"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("body.complete", body.complete);

    if (body.complete) {
      this.setState({ busResults: body });
      this.props.dispatch({
        type: "fetch-departures-done",
        busResults: this.state.busResults
      });
    } else {
      setInterval(pollSearch, 5000);
    }
  };

  clearSearch = event => {
    event.preventDefault();
    this.setState({ origin: "", destination: "", outbound_date: "" });
    this.props.dispatch({ type: "clear-search" });
  };

  render = () => {
    console.log("this.props.busResults", this.props.busResults);
    console.log("this.props.language", this.props.language);
    let lng = this.props.language;
    return (
      <div>
        <div>
          <select name="travelType" onChange={this.handleTravelTypeChange}>
            <option value="One way">
              {lng === "Fr" ? t("One way") : "One way"}
            </option>
            <option value="Round Trip">
              {lng === "Fr" ? t("Round Trip") : "Round Trip"}
            </option>
          </select>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              {lng === "Fr" ? t("Departure") : "Departure"}
              <input
                list="browsers"
                name="mybrowser"
                value={this.state.origin}
                onChange={this.handleOriginChange}
              />
            </label>
            <datalist id="browsers" onClick={this.handleOriginChange}>
              <option value="New York" />
              <option value={lng === "Fr" ? t("Montreal") : "Montreal"} />
            </datalist>

            <label>
              {lng === "Fr" ? t("Destination") : "Destination"}
              <input
                list="browsers"
                name="mybrowser"
                value={this.state.destination}
                onChange={this.handleDestinationChange}
              />
            </label>
            <datalist id="browsers" onClick={this.handleDestinationChange}>
              <option value="New York" />
              <option value="Montreal" />
            </datalist>

            <label>
              {lng === "Fr" ? t("Departure Date") : "Departure Date"}
            </label>
            <input
              type="date"
              value={this.state.outbound_date}
              onChange={this.handleOutboundDateChange}
            />
            <label>{lng === "Fr" ? t("Passengers") : "Passengers"}</label>
            {/* Add number of passengers */}
            <select name="passengers" onClick={this.handlePassengerChange}>
              <option value="adult">
                {lng === "Fr" ? t("1 adult") : "1 adult"}
              </option>
              <option value="child">
                {lng === "Fr" ? t("1 child") : "1 child"}
              </option>
              <option value="senior">
                {lng === "Fr" ? t("1 senior") : "1 senior"}
              </option>
            </select>
            <input
              type="submit"
              value={lng === "Fr" ? t("Search for buses") : "Search for buses"}
            />
            {this.props.busResults.departures !== undefined ? (
              <button onClick={this.clearSearch}>
                {lng === "Fr" ? t("Clear search") : "Clear search"}
              </button>
            ) : null}
          </form>
        </div>
        <div>
          {this.props.busResults.departures !== undefined &&
          this.props.busResults.operators !== undefined
            ? this.props.busResults.departures.map(bus => {
                return (
                  <div>
                    {this.props.busResults.operators.map(op => {
                      if (op.id === bus.operator_id) {
                        console.log("op.display_name", op.display_name);
                        return (
                          <div>
                            <div>{op.display_name}</div>
                            <div>
                              {lng === "Fr"
                                ? t("Departure time:")
                                : "Departure time:"}{" "}
                              {bus.departure_time
                                .split("T")
                                .join(" at ")
                                .slice(0, -3)}
                              {" from " + this.state.origin}
                            </div>
                            <div>
                              {lng === "Fr"
                                ? t("Arrival time:")
                                : "Arrival time:"}{" "}
                              {bus.arrival_time
                                .split("T")
                                .join(" at ")
                                .slice(0, -3)}
                            </div>
                            {lng === "Fr" ? t("Price:") : "Price:"}{" "}
                            {bus.prices.total}
                            {" " + bus.prices.currency}
                            <br />
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    busResults: state.busResults,
    language: state.language
  };
};

let Departures = connect(mapStateToProps)(UnconnectedDepartures);
export default Departures;
