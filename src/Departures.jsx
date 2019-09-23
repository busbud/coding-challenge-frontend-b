import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedDepartures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: "",
      outbound_date: "",
      passengers: "",
      travelType: "",
      busCompaniesResult: []
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("origin", this.state.origin);
    data.append("destination", this.state.destination);
    data.append("outbound_date", this.state.outbound_date);
    data.append("passengers", this.state.passengers);
    let response = await fetch("/search-initialized", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    console.log("parsed", parsed);
    this.setState({ busCompaniesResult: parsed });
  };

  handleOriginChange = event => {
    event.preventDefault();
    console.log("origin", event.target.value);
    this.setState({ origin: event.target.value });
  };

  handleDestinationChange = event => {
    event.preventDefault();
    console.log("destination", event.target.value);
    this.setState({ destination: event.target.value });
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

  render = () => {
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
            <label>Departure</label>
            <input
              type="text"
              value={this.state.origin}
              onChange={this.handleOriginChange}
            />

            <label>Destination</label>
            <input
              type="text"
              value={this.state.destination}
              onChange={this.handleDestinationChange}
            />
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
      </div>
    );
  };
}

let Departures = connect()(UnconnectedDepartures);
export default Departures;
