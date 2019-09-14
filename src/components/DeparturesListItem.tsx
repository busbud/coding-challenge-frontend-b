import React from "react";
import IDeparture from "../types/departure";
import IOperator from "../types/operator";
import ILocation from "../types/location";
import ICity from "../types/city";

import Card from "./ui/Card";
import Button from "./ui/Button";

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

export const DeparturesListItem: React.FunctionComponent<
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
    <li
      key={`dli-${index}-${origin.name}-${destination.name}-${departure.arrival_time}`}
      id={`dli-${index}-${origin.name}-${destination.name}-${departure.arrival_time}`}
      className="departures-list-item"
    >
      <Card>
        <div className="departures-list-item__row">
          <img src={operator.logo_url} alt={operator.name} />
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
