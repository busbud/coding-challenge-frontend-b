import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedDepartures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: "",
      outbound_date: "",
      passenger: ""
    };
  }

  handleSubmit = () => {};

  handleDepartureChange = event => {};
  handleDestinationChange = event => {};
  handleDepartureDateChange = event => {};
  handlePassengerChange = event => {};

  render = () => {
    return (
      <div>
        <div>All departures here</div>
        <div>
          <select>
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
              //   placeholder="departure"
              onChange={this.handleOriginChange}
            />
            <label>Destination</label>
            <input
              type="text"
              value={this.state.destination}
              //   placeholder="departure"
              onChange={this.handleDestinationChange}
            />
            <label>Departure Date</label>
            <input
              type="date"
              value={this.state.outbound_date}
              //   placeholder="departure"
              onChange={this.handleOutboundDateChange}
            />
            <label>Passengers</label>
            {/* Add number of passengers */}
            <select name="passengers">
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
