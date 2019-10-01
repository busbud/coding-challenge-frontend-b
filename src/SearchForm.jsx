import React, { Component } from "react";
import { connect } from "react-redux";
import { t, geohashCity } from "./Translations.jsx";

class UnconnectedSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: "",
      outbound_date: "",
      passengers: "",
      travelType: "",
      departures: [],
      operators: [],
      complete: false
    };
    this.pollSearch = this.pollSearch.bind(this);
    this.setFetchHeader = this.setFetchHeader.bind(this);
  }

  handleOriginChange = event => {
    event.preventDefault();
    let origin;

    if (event.target.value !== undefined) {
      origin = event.target.value;
    } else {
      origin = Array.from(event.target.selectedOptions)[0].value;
    }
    this.setState({ origin });
    this.props.dispatch({ type: "selected-origin", origin: this.state.origin });
  };

  handleDestinationChange = event => {
    event.preventDefault();
    let destination;

    if (event.target.value !== undefined) {
      destination = event.target.value;
    } else {
      destination = Array.from(event.target.selectedOptions)[0].value;
    }
    this.setState({ destination });
    this.props.dispatch({
      type: "selected-destination",
      destination: this.state.destination
    });
  };

  handleOutboundDateChange = event => {
    event.preventDefault();
    this.setState({ outbound_date: event.target.value });
    this.props.dispatch({
      type: "selected-outbound_date",
      outbound_date: this.state.outbound_date
    });
  };

  handlePassengerChange = event => {
    event.preventDefault();
    let passengers = Array.from(event.target.selectedOptions)[0].value;
    this.setState({ passengers });
    this.props.dispatch({
      type: "selected-passengers",
      passengers: this.state.passengers
    });
  };

  handleTravelTypeChange = event => {
    event.preventDefault();

    this.setState({
      travelType: Array.from(event.target.selectedOptions)[0].value
    });
    this.props.dispatch({
      type: "selected-travel_type",
      travelType: this.state.travelType
    });
  };

  setFetchHeader = (acceptValue, token, tokenValue) => {
    let headers = new Headers();
    headers.append("Accept", acceptValue);
    headers.append(token, tokenValue);
    return headers;
  };

  setFetchUri = child => {
    let uri =
      `https://napi.busbud.com/x-departures/${geohashCity(
        this.state.origin
      )}/${geohashCity(this.state.destination)}/${this.state.outbound_date}` +
      child;
    return uri;
  };

  pollSearch = async () => {
    // polling function called every 2 sec until the initial search is completed
    let iteration = 0;
    let uri;

    if (!this.state.complete) {
      if (iteration === 0) {
        uri = this.setFetchUri("/poll");
      } else {
        uri = this.setFetchUri("/poll?index=10");
      }

      try {
        let response = await fetch(uri, {
          method: "GET",
          headers: this.setFetchHeader(
            "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
            "X-Busbud-Token",
            "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
          ),
          mode: "cors"
        });
        let responseBody = await response.text();
        let body = JSON.parse(responseBody);
        console.log("Success:", JSON.stringify(responseBody));

        this.setState({
          departures: body.departures,
          operators: body.operators,
          complete: body.complete
        });
        this.props.dispatch({
          type: "fetch-departures-done",
          departures: this.state.departures,
          operators: this.state.operators
        });
        iteration += 1;
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    // search is initialized
    let uri = this.setFetchUri("");
    let body;
    try {
      let response = await fetch(uri, {
        method: "GET",
        headers: this.setFetchHeader(
          "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
          "X-Busbud-Token",
          "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
        ),
        mode: "cors"
      });
      let responseBody = await response.text();
      body = JSON.parse(responseBody);
      console.log("Success:", JSON.stringify(responseBody));

      this.setState({
        departures: body.departures,
        operators: body.operators,
        complete: body.complete
      });
      this.props.dispatch({
        type: "fetch-departures-done",
        departures: this.state.departures,
        operators: this.state.operators
      });
    } catch (error) {
      console.log("Error:", error);
    }

    // if the search initialized is incomplete => search is polled
    if (!body.complete) {
      // The polling endpoints should be called every 2 seconds until complete is true
      setInterval(() => this.pollSearch(), 2000);
    }
  };

  clearSearch = event => {
    event.preventDefault();
    this.setState({ origin: "", destination: "", outbound_date: "" });
    this.props.dispatch({ type: "clear-search" });
  };

  render = () => {
    let lng = this.props.language;

    return (
      <div>
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
            <div className="departure-container">
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
                    <option value={lng === "Fr" ? t("Montreal") : "Montreal"} />
                  </datalist>
                </div>
              </div>
            </div>
            <div className="destination-container">
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
                className="input-search"
                value={lng === "Fr" ? t("search") : "search"}
              />

              {this.props.departures !== undefined ? (
                <button id="submit-btn" onClick={this.clearSearch}>
                  {lng === "Fr" ? t("clear") : "clear"}
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    departures: state.departures,
    operators: state.operators,
    language: state.language
  };
};
let SearchForm = connect(mapStateToProps)(UnconnectedSearchForm);
export default SearchForm;
