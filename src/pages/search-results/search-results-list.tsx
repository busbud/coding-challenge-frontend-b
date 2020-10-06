import React from "react";
import { Stack } from "@chakra-ui/core";
import { XDepartureCard } from "../../shared/components";

import { QueryDepartureResult, City, Location, Operator } from "../../types";

type mapListByIdFunction = <T>(
  list: T[],
  idKey?: string
) => { [key: string]: T };
const mapListById: mapListByIdFunction = (list, idKey = "id") => {
  return list.reduce((acc, element) => {
    const id = element[idKey];
    acc[id] = element;
    return acc;
  }, {});
};

type SearchResultsListProps = QueryDepartureResult & {
  isDepartureVisible: Function;
  addToSearchDataCallback: Function;
};
export const SearchResultsList: React.FunctionComponent<SearchResultsListProps> = React.memo(
  ({
    complete,
    departures = [],
    locations = [],
    cities = [],
    operators = [],
    isDepartureVisible = () => {},
    addToSearchDataCallback = () => {},
  }) => {
    const OperatorsById = mapListById<Operator>(operators);
    const LocationsById = mapListById<Location>(locations);
    const CitiesById = mapListById<City>(cities);

    return (
      <Stack padding="1rem" spacing="1.5rem">
        {departures &&
          departures.map((departure) => {
            if (!isDepartureVisible(departure)) return null;

            // Rassembling info for origin
            const originLocation = LocationsById[departure.origin_location_id];
            const originCity = CitiesById[originLocation?.city_id];
            // Rassembling info for destination
            const destinationLocation =
              LocationsById[departure.destination_location_id];
            const destinationCity = CitiesById[destinationLocation?.city_id];
            return (
              <XDepartureCard
                key={departure.id}
                departure={departure}
                origin={{ location: originLocation, city: originCity }}
                destination={{
                  location: destinationLocation,
                  city: destinationCity,
                }}
                operator={OperatorsById[departure.operator_id]}
              />
            );
          })}
      </Stack>
    );
  }
);
