import React from "react";
import { render, cleanup } from "@testing-library/react";
import { IntlProvider } from "react-intl";

import Trips from "./../Trips";
import { IOperator, ILocation, IDeparture } from "../../../api/ITicket";
import messages from "./../../../i18n/messages/en.json";

afterEach(cleanup);

describe("Trips", () => {
  test("should display a list of Trip", () => {
    const arrivalCity = { id: "arrivalCityId", name: "MTL" };
    const departures: ReadonlyArray<IDeparture> = [
      {
        id: "departure1Id",
        arrivalTime: new Date(),
        departureTime: new Date(),
        operatorId: "operator1",
        arrivalLocationId: "location1",
        departureLocationId: "location1",
        prices: {
          currency: "EUR",
          total: 5000
        }
      },
      {
        id: "departure2Id",
        arrivalTime: new Date(),
        departureTime: new Date(),
        operatorId: "operator1",
        arrivalLocationId: "location1",
        departureLocationId: "location1",
        prices: {
          currency: "EUR",
          total: 6000
        }
      }
    ];
    const locations: ReadonlyMap<string, ILocation> = new Map([
      ["location1", { id: "location1", name: "location1" }]
    ]);
    const operators: ReadonlyMap<string, IOperator> = new Map([
      ["operator1", { id: "operator1", name: "operator1" }]
    ]);
    const originCity = { id: "originCityId", name: "NYC" };

    const { getByTestId } = render(
      <IntlProvider locale="en" messages={messages}>
        <Trips
          originCity={originCity}
          locations={locations}
          operators={operators}
          arrivalCity={arrivalCity}
          departures={departures}
        />
      </IntlProvider>
    );

    expect(getByTestId("trips")).toBeInTheDocument();
    expect(getByTestId("trips").children).toHaveLength(2);
  });
});
