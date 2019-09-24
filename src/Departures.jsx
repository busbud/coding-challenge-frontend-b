import React, { Component } from "react";
import { connect } from "react-redux";
import { t, geohashCity } from "./Translations.jsx";
import "./style/Departures.css";

class UnconnectedDepartures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: "",
      outbound_date: "",
      passengers: "",
      travelType: "",
      busResults: {},
      page: 0
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

    let pollSearch = async event => {
      // event.preventDefault();
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
      let body;

      try {
        let response = await fetch(uri, {
          method: "GET",
          headers: headers,
          mode: "cors"
        });
        let responseBody = await response.text();
        body = JSON.parse(responseBody);
        console.log("Success:", JSON.stringify(responseBody));

        this.setState({ busResults: body });
        this.props.dispatch({
          type: "fetch-departures-done",
          busResults: this.state.busResults
        });
        console.log("body pollSearch", body);
      } catch (error) {
        console.log("Error:", error);
      }

      // if (body.complete) {
      //   clearInterval(setInterval(pollSearch, 5000));
      //   console.log("clear interval");
      // }
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
    let body;

    try {
      let response = await fetch(uri, {
        method: "GET",
        headers: headers,
        mode: "cors"
      });
      let responseBody = await response.text();
      body = JSON.parse(responseBody);
      console.log("Success:", JSON.stringify(responseBody));
    } catch (error) {
      console.log("Error:", error);
    }

    console.log("body.complete", body.complete);

    if (body.complete) {
      this.setState({ busResults: body });
      this.props.dispatch({
        type: "fetch-departures-done",
        busResults: this.state.busResults
      });
    }
    if (!body.complete) {
      event.preventDefault();
      setInterval(pollSearch, 2000);
    }
  };

  clearSearch = event => {
    event.preventDefault();
    this.setState({ origin: "", destination: "", outbound_date: "" });
    this.props.dispatch({ type: "clear-search" });
  };

  goBackToPreviousPage = event => {
    event.preventDefault();
    this.setState({ page: this.state.page - 1 });
  };

  goToNextPage = event => {
    event.preventDefault();
    this.setState({ page: this.state.page + 1 });
  };

  render = () => {
    console.log("this.props.busResults", this.props.busResults);
    console.log("this.props.language", this.props.language);
    let lng = this.props.language;
    return (
      <div className="global-container">
        <div className="search-bus-container">
          <h3 className="search-bus-header">
            {lng === "Fr" ? t("Search Bus") : "Search Bus"}
          </h3>
          <div className="trip-type">
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
              <div className="departure-destination-container">
                <div className="label-input-container">
                  <div className="label">
                    {lng === "Fr" ? t("Departure") : "Departure"}
                  </div>
                  <div>
                    <input
                      list="browsers"
                      name="mybrowser"
                      value={this.state.origin}
                      onChange={this.handleOriginChange}
                    />

                    <datalist id="browsers" onClick={this.handleOriginChange}>
                      <option value="New York" />
                      <option
                        value={lng === "Fr" ? t("Montreal") : "Montreal"}
                      />
                    </datalist>
                  </div>
                </div>
                <div className="label-input-container">
                  <div className="label">
                    {lng === "Fr" ? t("Destination") : "Destination"}
                  </div>
                  <div>
                    <input
                      list="browsers"
                      name="mybrowser"
                      value={this.state.destination}
                      onChange={this.handleDestinationChange}
                    />
                    <datalist
                      id="browsers"
                      onClick={this.handleDestinationChange}
                    >
                      <option value="New York" />
                      <option value="Montreal" />
                    </datalist>
                  </div>
                </div>
              </div>
              <div className="departure-date-container">
                <div className="label-input-container">
                  <div className="label">
                    {lng === "Fr" ? t("Departure Date") : "Departure Date"}
                  </div>
                  <input
                    type="date"
                    value={this.state.outbound_date}
                    onChange={this.handleOutboundDateChange}
                  />
                </div>
              </div>
              <div className="passengers-container">
                <div className="label-input-container">
                  <div className="label">
                    {lng === "Fr" ? t("Passengers") : "Passengers"}
                  </div>
                  {/* Add number of passengers */}
                  <div>
                    <select
                      name="passengers"
                      onClick={this.handlePassengerChange}
                    >
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
                  </div>
                </div>
              </div>

              <div className="search-bus-btn-container">
                <input
                  type="submit"
                  id="submit-btn"
                  value={
                    lng === "Fr" ? t("Search for buses") : "Search for buses"
                  }
                />

                {this.props.busResults.departures !== undefined ? (
                  <button id="submit-btn" onClick={this.clearSearch}>
                    {lng === "Fr" ? t("Clear search") : "Clear search"}
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
        <div>
          {this.props.busResults.departures !== undefined &&
          this.props.busResults.operators !== undefined
            ? this.props.busResults.departures
                .slice(this.state.page * 3, this.state.page * 3 + 3)
                .map(bus => {
                  return (
                    <div className="departure-result-container">
                      {this.props.busResults.operators.map(op => {
                        if (op.id === bus.operator_id) {
                          console.log("op.display_name", op.display_name);
                          return (
                            <div>
                              <div className="operator-price">
                                <b>{op.display_name.toUpperCase()}</b>
                                <br />
                                <div className="label-bus-results" id="price">
                                  {bus.prices.total}
                                  {" $" + bus.prices.currency.slice(0, 2)}
                                </div>{" "}
                              </div>
                              <div>
                                <div className="label-bus-results">
                                  {lng === "Fr"
                                    ? t("Departure time:")
                                    : "Departure time:"}{" "}
                                </div>
                                <div className="departure-arrival-result">
                                  {bus.departure_time
                                    .split("T")
                                    .join(" at ")
                                    .slice(0, -3)}
                                  {" from " + this.state.origin}
                                </div>
                              </div>
                              <div>
                                <div className="label-bus-results">
                                  {lng === "Fr"
                                    ? t("Arrival time:")
                                    : "Arrival time:"}{" "}
                                </div>
                                <div className="departure-arrival-result">
                                  {bus.arrival_time
                                    .split("T")
                                    .join(" at ")
                                    .slice(0, -3)}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                })
            : null}
        </div>
        <div>
          {this.props.busResults.departures !== undefined &&
          this.state.page > 0 ? (
            <button
              className="pagination-btn"
              onClick={this.goBackToPreviousPage}
            >
              {lng === "Fr" ? t("back") : "back"}
            </button>
          ) : null}
          {this.props.busResults.departures !== undefined &&
          this.props.busResults.departures.length / (this.state.page + 1) >
            3 ? (
            <button className="pagination-btn" onClick={this.goToNextPage}>
              {lng === "Fr" ? t("next") : "next"}
            </button>
          ) : null}
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
