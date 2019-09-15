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

const DeparturesList: React.FunctionComponent<DeparturesListProps> = props => {
  let listElement;
  let sortControls;
  if (props.error.length > 0) {
    console.log(props.error);
    return <div>{props.error}</div>;
  } else if (props.searching) {
    listElement = <div>Searching...</div>;
  } else {
    // Safeguarding here for when a (initial) response doesn't return all the data
    // we want. Because we depend on all data being available since we're filtering
    // cities, locations, etc, it's probably a good idea to do that here.
    if (
      props.departures &&
      props.departures.length > 0 &&
      props.locations &&
      props.locations.length > 0 &&
      props.operators &&
      props.operators.length > 0 &&
      props.cities &&
      props.cities.length > 0
    ) {
      // Display the controls for sorting only if there are enough items in the list to sort
      sortControls = (
        <div className="sorting-controls">
          <Button type="secondary" size="medium" onClick={props.sortByTime}>
            {props.timeSortText}
          </Button>
          <Button type="secondary" size="medium" onClick={props.sortByPrice}>
            {props.priceSortText}
          </Button>
        </div>
      );
      listElement = props.departures.map((departure, index) => {
        // get origin by filtering from locations
        const origin = props.locations.filter(
          location => location.id === departure.origin_location_id
        )[0];
        // get destination by filtering from locations
        const destination = props.locations.filter(
          location => location.id === departure.destination_location_id
        )[0];
        // get city name of origin
        const originCity = props.cities.filter(c => c.id === origin.city_id)[0];
        // get city name of destination
        const destinationCity = props.cities.filter(
          c => c.id === destination.city_id
        )[0];
        // get operator by filtering from operators
        const operator = props.operators.filter(
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
            selectText={props.selectText}
            index={index}
            key={`dli-${index}-${origin.name}-${destination.name}-${departure.arrival_time}`}
          />
        );
      });
    }
  }

  return (
    <div>
      {sortControls}
      <ul className="departures-list">{listElement}</ul>
    </div>
  );
};

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
