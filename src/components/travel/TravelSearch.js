import React, { Component } from "react";
import PropTypes from "prop-types";
// Third party libraries
import Typography from "@material-ui/core/Typography";
import Translate from "react-translate-component";
// Components imports
import TravelSelection, {
  TravelSelectionDefaultValuePropTypes
} from "./TravelSelection";
import TravelList from "./TravelList";
import Spinner from "./Spinner";
// Other imports
import Http from "./../../api/http";
// Inner imports
import "./TravelSearch.css";
import { Object } from "core-js";

class TravelSearch extends Component {
  state = {
    noSearchDone: true,
    searchInProgress: false,
    origin: {
      name: "",
      geohash: ""
    },
    destination: {
      name: "",
      geohash: ""
    },
    outboundDate: "",
    departures: []
  };

  constructor() {
    super();
    this.httpGetDeparturesSubscription = { unsubscribe: () => {} };
  }

  searchBuses = (origin, destination, outboundDate) => {
    this.setState({
      departures: [],
      origin,
      destination,
      outboundDate,
      searchInProgress: true
    });
    this.httpGetDeparturesSubscription.unsubscribe();
    this.httpGetDeparturesSubscription = Http.getDepartures(
      origin.geohash,
      destination.geohash,
      outboundDate
    ).subscribe(
      xDeparturesObj => {
        this.importXDeparturesObj(xDeparturesObj);
        this.setState({
          noSearchDone: false,
          searchInProgress: false
        });
      },
      e => {
        this.setState({
          noSearchDone: false,
          searchInProgress: false
        });
        console.error(e);
      }
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
      const operators = xDeparturesObj.operators.reduce(function(map, obj) {
        map[obj.id] = obj;
        return map;
      }, {});
      for (let departure of xDeparturesObj.departures) {
        newDepartures.push(
          this.convertDeparture(departure, locations, operators)
        );
      }
    }

    this.setState({ departures: this.state.departures.concat(newDepartures) });
  }

  convertDeparture(departure, locations, operators) {
    const operatorTmp = operators[departure["operator_id"]] || {};
    const id = departure.id,
      departureTime = departure["departure_time"],
      originLocation = (locations[departure["origin_location_id"]] || {}).name,
      arrivalTime = departure["arrival_time"],
      destinationLocation = (
        locations[departure["destination_location_id"]] || {}
      ).name,
      prices = `${departure.prices.total / 100} ${departure.prices.currency}`, // Convert price in Float with 2 digits after comma because prices.total come from server in Integer
      operator = {
        name: operatorTmp.name,
        logoUrl: operatorTmp["logo_url"],
        url: operatorTmp.url
      },
      linksBusbud = departure.links.deeplink;

    return {
      id,
      departureTime,
      originLocation,
      arrivalTime,
      destinationLocation,
      prices,
      operator,
      linksBusbud
    };
  }

  render() {
    const {
      departures,
      noSearchDone,
      origin,
      destination,
      outboundDate,
      searchInProgress
    } = this.state;
    const { classes = {}, defaultValueTravelSelection } = this.props;

    return (
      <div className={classes.travelSearch}>
        <div className="travel-search__search-title">
          <Typography variant="title">
            <Translate content="travel.search.selection_title" />
          </Typography>
        </div>
        <TravelSelection
          askSearch={this.searchBuses}
          defaultValue={defaultValueTravelSelection}
          searchDisable={searchInProgress}
        />
        <div className="travel-search__result-title">
          <Typography variant="title">
            <Translate
              content={`travel.search.result_title.${
                searchInProgress
                  ? "in_progess"
                  : noSearchDone
                    ? "nothing_done"
                    : departures.length > 0
                      ? "found"
                      : "not_found"
              }`}
              with={{
                numberOfDeparture: departures.length,
                dateSearched: outboundDate,
                townOrigin: origin.name,
                townDestination: destination.name
              }}
            />
          </Typography>
          {searchInProgress ? <Spinner /> : null}
        </div>
        <TravelList journeys={departures} />
      </div>
    );
  }
}

TravelSearch.propTypes = {
  classes: PropTypes.object,
  defaultValueTravelSelection: TravelSelectionDefaultValuePropTypes
};

export default TravelSearch;
