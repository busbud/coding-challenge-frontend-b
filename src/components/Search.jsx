import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/Search.css";

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Fetch data from api for search request
  goFetch = () => {
    //Search Query, 1 adult only, Canadian Currency
    let originalQuery =
      "https://napi.busbud.com/x-departures/" +
      this.props.origin +
      "/" +
      this.props.destination +
      "/" +
      this.props.date +
      "?adult=1&child=0&senior=0&lang=US$currency=USD";

    //set query to be used, if polling add index
    let query = this.props.pollstop
      ? originalQuery
      : this.props.query + "&index=" + this.props.departures.length;
    fetch(query, {
      headers: {
        Accept:
          "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
      }
    })
      .then(response => {
        return response.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        console.log("Body: ", body);
        //Also check for 404
        if (body.complete === true) {
          this.props.dispatch({
            type: "results",
            results: body,
            departures: this.props.departures.concat(body.departures),
            pollstop: true,
            query: originalQuery
          });
        } else {
          this.props.dispatch({
            type: "results",
            results: body,
            departures: this.props.departures.concat(body.departures),
            pollstop: false,
            query: originalQuery
          });
        }
      });
  };

  handleSubmit(event) {
    event.preventDefault();

    //Would add a dropdown list or autofill for locations.
    if (
      this.props.origin === "" ||
      this.props.destination === "" ||
      this.props.date === ""
    ) {
      window.alert("Please fill in the fields.");
      return;
    }
    this.goFetch();
  }

  //polling fetch when search results are not complete yet, return if completed.
  polling = () => {
    if (this.props.pollstop || this.props.pollstop === undefined) {
      return;
    } else {
      setTimeout(() => {
        this.goFetch();
      }, 3000);
    }
  };

  //Set origin in state
  handleOrigin = event => {
    this.props.dispatch({ type: "origin", origin: event.target.value });
  };

  //Set destination in state
  handleDestination = event => {
    this.props.dispatch({
      type: "destination",
      destination: event.target.value
    });
  };

  //Set date in state
  handleDate = event => {
    this.props.dispatch({ type: "date", date: event.target.value });
  };

  //Reset all values to default
  handleReset = () => {
    this.props.dispatch({ type: "reset" });
  };

  resetButton = () => {
    return (
      <div>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  };

  //Display card a departure, detailing departure information
  departureCard = (
    key,
    departureTime,
    arrivalTime,
    location,
    price,
    transfers
  ) => {
    return (
      <div className="departure-card" key={"departure_" + key} id={"id_" + key}>
        <span>Departure Time: {departureTime}</span>
        <br />
        <span>Arrival Time: {arrivalTime}</span>
        <br />
        <span>Location: {location}</span>
        <br />
        <span>Price: {price}</span>
        <br />
        <span>Transfers: {transfers}</span>
      </div>
    );
  };

  //Return all departures retrieved from search
  getDepartures = () => {
    console.log("Getting Departures:");
    if (this.props.results === []) {
      return <div className="departure-card">No departures to show.</div>;
    } else if (this.props.results !== undefined) {
      let results = this.props.results;
      let locations = results.locations;

      //Go thorugh departures to display each
      return results.departures.map((departure, index) => {
        let departure_time = new Date(departure.departure_time);
        let arrival_time = new Date(departure.arrival_time);
        let destination_location = locations.find(function(location) {
          return location.id === departure.destination_location_id;
        });
        return (
          <div key={"card_" + index}>
            {this.departureCard(
              index,
              departure_time.toLocaleString(),
              arrival_time.toLocaleString(),
              destination_location.name +
                " (" +
                destination_location.type +
                ")",
              departure.prices.total / 100 + "$ " + departure.prices.currency,
              departure.has_transfers ? departure.details.num_transfers : 0
            )}
            <br />
          </div>
        );
      });
    }

    return (
      <div className="departure-card">
        Please select an origin, destination location, and departure date.{" "}
        <br /> Then click "search".
      </div>
    );
  };

  render = () => {
    return (
      <div className="Search">
        <div className="Search-main">
          <header>
            <h1>OsheagaBud</h1>
          </header>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="div-form">
            <form onSubmit={this.handleSubmit}>
              Origin:{" "}
              <input
                type="text"
                name="origin"
                value={this.props.origin}
                onChange={this.handleOrigin}
              />
              <br />
              Destination:{" "}
              <input
                type="text"
                name="destination"
                value={this.props.destination}
                onChange={this.handleDestination}
              />
              <br />
              Date:{" "}
              <input
                type="text"
                name="date"
                value={this.props.date}
                onChange={this.handleDate}
              />
              <br />
              <button type="Submit">Search</button>
            </form>
            {this.resetButton()}
          </div>
          <br />
          {this.getDepartures()}
          {this.polling()}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    origin: state.origin,
    destination: state.destination,
    date: state.date,
    results: state.results,
    departures: state.departures,
    pollstop: state.pollstop,
    query: state.query
  };
};

let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
