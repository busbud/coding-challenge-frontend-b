import React, { Component } from "react";
// Third party libraries
import Typography from "@material-ui/core/Typography";
import Translate from "react-translate-component";
// Components imports
import TravelSelection from "./TravelSelection";
import TravelList from "./TravelList";
// Other imports
import Http from "./../../api/http";
// Inner imports
import "./TravelSearch.css";
import { Object } from "core-js";

class TravelSearch extends Component {
  state = {
    departures: []
  };

  constructor() {
    super();
    this.httpGetDeparturesSubscription = { unsubscribe: () => {} };
  }

  searchBuses = (origin, destination, outboundDate) => {
    this.httpGetDeparturesSubscription.unsubscribe();
    this.setState({ departures: [] });
    this.httpGetDeparturesSubscription = Http.getDepartures(
      origin,
      destination,
      outboundDate
    ).subscribe(
      xDeparturesObj => this.importXDeparturesObj(xDeparturesObj),
      e => console.error(e)
    );
  };

  importXDeparturesObj(xDeparturesObj) {
    const newDepartures = [];

    if (
      Object.isObject(xDeparturesObj) &&
      Array.isArray(xDeparturesObj.departures) &&
      Array.isArray(xDeparturesObj.locations)
    ) {
      const locations = xDeparturesObj.locations.reduce(function(map, obj) {
        map[obj.id] = obj;
        return map;
      }, {});
      // TODO REMOVE
      console.log(xDeparturesObj.departures);
      for (let departure of xDeparturesObj.departures) {
        newDepartures.push(this.convertDeparture(departure, locations));
      }
      // TODO REMOVE
      console.log(newDepartures);
    }

    this.setState({ departures: this.state.departures.concat(newDepartures) });
  }

  convertDeparture(departure, locations) {
    const id = departure.id,
      departureTime = departure["departure_time"],
      originLocation = (locations[departure["origin_location_id"]] || {}).name,
      arrivalTime = departure["arrival_time"],
      destinationLocation = (
        locations[departure["destination_location_id"]] || {}
      ).name,
      prices = departure.prices.total / 100; // Convert price in Float with 2 digits after comma because prices.total come from server in Integer

    return {
      id,
      departureTime,
      originLocation,
      arrivalTime,
      destinationLocation,
      prices
    };
  }

  render() {
    const { departures } = this.state;

    return (
      <div>
        <div className="travel-search__search-title">
          <Typography variant="title">
            <Translate content="travel.search.selection_title" />
          </Typography>
        </div>
        <TravelSelection askSearch={this.searchBuses} />
        <div className="travel-search__result-title">
          <Typography variant="title">
            <Translate content="travel.search.result_title" />
          </Typography>
        </div>
        <TravelList journeys={departures} />
      </div>
    );
  }
}

export default TravelSearch;
