import React, { Component } from "react";
import { connect } from "react-redux";

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
    // .map(
    //   option => option.value
    // );
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

    let origin;
    let destination;
    if (this.state.origin === "New York") {
      origin = "dr5reg";
    } else {
      origin = "f25dvk";
    }
    if (this.state.destination.includes("New York")) {
      destination = "dr5reg";
    } else {
      console.log("here");
      destination = "f25dvk";
    }

    let pollSearch = async () => {
      iteration += 1;
      console.log("iteration", iteration);

      let origin;
      let destination;
      if (this.state.origin === "New York") {
        origin = "dr5reg";
      } else {
        origin = "f25dvk";
      }
      if (this.state.destination.includes("New York")) {
        destination = "dr5reg";
      } else {
        console.log("here");
        destination = "f25dvk";
      }
      let uri =
        "https://napi.busbud.com/x-departures/" +
        origin +
        "/" +
        destination +
        "/" +
        this.state.outbound_date +
        "/poll";
      // "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02/poll";
      if (iteration > 1) {
        uri =
          "https://napi.busbud.com/x-departures/" +
          origin +
          "/" +
          destination +
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
      origin +
      "/" +
      destination +
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

  render = () => {
    console.log("this.state.busResults", this.state.busResults);
    console.log("this.props.busResults", this.props.busResults);

    return (
      <div>
        <div>All departures here</div>
        <div>
          <select name="travelType" onChange={this.handleTravelTypeChange}>
            <option value="One way">One way</option>
            <option value="Round Trip">Round Trip</option>
          </select>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Departure
              <input
                list="browsers"
                name="mybrowser"
                onChange={this.handleOriginChange}
              />
            </label>
            <datalist id="browsers" onClick={this.handleOriginChange}>
              <option value="New York" />
              <option value="Montreal" />
            </datalist>

            <label>
              Destination
              <input
                list="browsers"
                name="mybrowser"
                onChange={this.handleDestinationChange}
              />
            </label>
            <datalist id="browsers" onClick={this.handleDestinationChange}>
              <option value="New York" />
              <option value="Montreal" />
            </datalist>

            <label>Departure Date</label>
            <input
              type="date"
              value={this.state.outbound_date}
              onChange={this.handleOutboundDateChange}
            />
            <label>Passengers</label>
            {/* Add number of passengers */}
            <select name="passengers" onClick={this.handlePassengerChange}>
              <option value="adult">adult</option>
              <option value="child">child</option>
              <option value="senior">senior</option>
            </select>
            <input type="submit" value="Search for buses" />
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
                              Departure time:{" "}
                              {bus.departure_time
                                .split("T")
                                .join(" at ")
                                .slice(0, -3)}
                              {" from " + this.state.origin}
                            </div>
                            <div>
                              Arrival time:{" "}
                              {bus.arrival_time
                                .split("T")
                                .join(" at ")
                                .slice(0, -3)}
                            </div>
                            Price: {bus.prices.total}
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
    busResults: state.busResults
  };
};

let Departures = connect(mapStateToProps)(UnconnectedDepartures);
export default Departures;
