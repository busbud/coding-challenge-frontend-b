import React from "react";
import { StoreState } from "../types/StoreState";
import { connect } from "react-redux";
import "./DeparturesList.css";
import IDeparture from "../types/departure";
import IOperator from "../types/operator";
import ILocation from "../types/location";
import ICity from "../types/city";
import { DeparturesListItem } from "./DeparturesListItem";
import Button from "./ui/Button";
import { sortByTime, sortByPrice } from "../actions";

interface DeparturesListProps {
  departures: Array<IDeparture>;
  locations: Array<ILocation>;
  operators: Array<IOperator>;
  cities: Array<ICity>;
  searching: boolean;
  selectText: string;
  error: string;
  sortByPrice: () => void;
  sortByTime: () => void;
  priceSortText: string;
  timeSortText: string;
}

class DeparturesList extends React.Component<DeparturesListProps, any> {
  render() {
    let listElement;
    let sortControls;
    if (this.props.error.length > 0) {
      console.log(this.props.error);
      return <div>{this.props.error}</div>;
    }
    if (this.props.searching) {
      listElement = <div>Searching...</div>;
    } else {
      // Display the controls for sorting only if there are enough items in the list to sort
      if (this.props.departures.length > 1) {
        sortControls = (
          <div className="sorting-controls">
            <Button
              type="secondary"
              size="medium"
              onClick={this.props.sortByTime}
            >
              {this.props.timeSortText}
            </Button>
            <Button
              type="secondary"
              size="medium"
              onClick={this.props.sortByPrice}
            >
              {this.props.priceSortText}
            </Button>
          </div>
        );
      }
      listElement = this.props.departures.map((departure, index) => {
        // get origin by filtering from locations
        const origin = this.props.locations.filter(
          location => location.id === departure.origin_location_id
        )[0];
        // get destination by filtering from locations
        const destination = this.props.locations.filter(
          location => location.id === departure.destination_location_id
        )[0];
        // get city name of origin
        const originCity = this.props.cities.filter(
          c => c.id === origin.city_id
        )[0];
        // get city name of destination
        const destinationCity = this.props.cities.filter(
          c => c.id === destination.city_id
        )[0];
        // get operator by filtering from operators
        const operator = this.props.operators.filter(
          op => op.id === departure.operator_id
        )[0];
        // get duration by subtracting departure from arrival
        const duration =
          Math.abs(
            new Date(departure.arrival_time).getTime() -
              new Date(departure.departure_time).getTime()
          ) / 1000;
        return (
          <DeparturesListItem
            departure={departure}
            operator={operator}
            origin={origin}
            originCity={originCity}
            destination={destination}
            destinationCity={destinationCity}
            duration={duration}
            selectText={this.props.selectText}
            index={index}
            key={index}
          />
        );
      });
    }

    return (
      <div>
        {sortControls}
        <ul className="departures-list">{listElement}</ul>
      </div>
    );
  }
}

export default connect(
  ({
    searching,
    departures,
    locations,
    operators,
    cities,
    error
  }: StoreState) => {
    return {
      searching,
      departures,
      locations,
      operators,
      cities,
      error
    };
  },
  (dispatch: any) => {
    return {
      sortByPrice: () => dispatch(sortByPrice()),
      sortByTime: () => dispatch(sortByTime())
    };
  }
)(DeparturesList);
