import { shallow } from "enzyme";
import React from "react";
import ResultList from "./ResultList";

it("expect to render ResultList component", () => {
  const mockDepartures = [
    {
      id: 1,
      departure_time: "2016-01-14T00:01:00",
      arrival_time: "2016-01-14T07:55:00",
      destination_location_id: 1234,
      origin_location_id: 4321,
      prices: {
        total: 5200
      }
    }
  ];

  const mockLocations = [
    {
      id: 1234,
      city_id: "375dd5879001acbd84a4683dedfb933e",
      name: "Métro Bonaventure Bus Station",
      address: ["997 Rue St-Antoine Ouest", "Montreal, QC H3C 1A6"],
      type: "transit_station",
      lat: 45.4988273060484,
      lon: -73.5644745826722,
      geohash: "f25dvfzcz"
    },
    {
      id: 4321,
      city_id: "5687205723405fhfs024230948",
      name: "Métro Guy Bus Station",
      address: ["997 Rue Guy", "Montreal, QC H3C 1A6"],
      type: "transit_station",
      lat: 45.4988273060484,
      lon: -73.5644745826722,
      geohash: "f25dvfzcz"
    }
  ];

  expect(
    shallow(
      <ResultList departures={mockDepartures} locations={mockLocations} />
    ).debug()
  ).toMatchSnapshot();
});
