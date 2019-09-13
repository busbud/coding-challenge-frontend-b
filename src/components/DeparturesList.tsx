import React from "react";
import { StoreState } from "../types/StoreState";
import { connect } from "react-redux";
import Card from "./ui/Card";
import "./DeparturesList.css";
import Button from "./ui/Button";
import IDeparture from "../types/departure";
import IOperator from "../types/operator";
import ILocation from "../types/location";
import ICity from "../types/city";

interface DeparturesListProps {
  departures: Array<IDeparture>;
  locations: Array<ILocation>;
  operators: Array<IOperator>;
  cities: Array<ICity>;
  searching: boolean;
  selectText: string;
}

interface DeparturesListItemProps {
  departure: IDeparture;
  operator: IOperator;
  origin: ILocation;
  originCity: ICity;
  destination: ILocation;
  destinationCity: ICity;
  duration: number;
  selectText: string;
  index: number;
}

const DeparturesListItem: React.FunctionComponent<
  DeparturesListItemProps
> = props => {
  const {
    departure,
    operator,
    origin,
    originCity,
    destination,
    destinationCity,
    duration,
    selectText,
    index
  } = props;
  return (
    <li key={`departure-list-item--${index}`} className="departures-list-item">
      <Card>
        <div className="departures-list-item__row">
          <div>{operator.name}</div>
          <div>${(departure.prices.total / 100).toFixed(2)}</div>
        </div>
        <div className="departures-list-item__row">
          <div>
            <span className="departures-list-item__departure-time">
              <b>{new Date(departure.departure_time).toLocaleTimeString()}</b>
            </span>{" "}
            <span>
              {originCity.name} - {origin.name}
            </span>
          </div>
        </div>
        <div className="departures-list-item__row">
          <div className="departures-list-item__arrival-time">
            <span>
              <b>{new Date(departure.arrival_time).toLocaleTimeString()}</b>
            </span>{" "}
            <span>
              {destinationCity.name} - {destination.name}
            </span>
          </div>
        </div>
        <div className="departures-list-item__row">
          <div>
            {Math.floor(duration / 3600) % 24}h {Math.floor(duration / 60) % 60}
            m
          </div>
          <Button type="primary" size="medium">
            {selectText}
          </Button>
        </div>
      </Card>
    </li>
  );
};

class DeparturesList extends React.Component<DeparturesListProps, any> {
  render() {
    let listElement;
    if (this.props.searching) {
      listElement = <div>Loading...</div>;
    } else {
      if (
        this.props.departures &&
        this.props.departures.length > 0 &&
        this.props.locations &&
        this.props.locations.length > 0 &&
        this.props.operators &&
        this.props.operators.length > 0 &&
        this.props.cities &&
        this.props.cities.length > 0
      ) {
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
    }

    return <ul className="departures-list">{listElement}</ul>;
  }
}

export default connect(
  ({ searching, departures, locations, operators, cities }: StoreState) => {
    return {
      searching,
      departures,
      locations,
      operators,
      cities
    };
  }
)(DeparturesList);
