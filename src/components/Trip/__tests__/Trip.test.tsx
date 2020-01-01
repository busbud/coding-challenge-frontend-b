import React from "react";
import { render, cleanup } from "@testing-library/react";
import { IntlProvider } from "react-intl";

import Trip from "./../Trip";
import { IOperator, ILocation, IDeparture } from "../../../api/ITicket";
import messages from "./../../../i18n/messages/en.json";

afterEach(cleanup);

const arrivalCity = { id: "arrivalCityId", name: "MTL" };
const departure: IDeparture = {
  id: "departure1Id",
  arrivalTime: new Date("2020-08-02T06:33:00.000Z"),
  departureTime: new Date("2020-08-02T14:33:00.000Z"),
  operatorId: "operator1",
  arrivalLocationId: "location1",
  departureLocationId: "location2",
  prices: {
    currency: "EUR",
    total: 5000
  }
};
const locations: ReadonlyMap<string, ILocation> = new Map([
  ["location1", { id: "location1", name: "location 1" }],
  ["location2", { id: "location1", name: "location 2" }]
]);

const operators: ReadonlyMap<string, IOperator> = new Map([
  ["operator1", { id: "operator1", name: "operator1" }]
]);
const originCity = { id: "originCityId", name: "NYC" };

describe("Trip", () => {
  test("should display departure and arrival time", () => {
    const { getByText } = render(
      <IntlProvider locale="en" messages={messages}>
        <Trip
          originCity={originCity}
          locations={locations}
          operators={operators}
          arrivalCity={arrivalCity}
          departure={departure}
        />
      </IntlProvider>
    );

    expect(getByText("9:33 AM")).toBeInTheDocument();
    expect(getByText("1:33 AM")).toBeInTheDocument();
  });

  test("should display departure and arrival cities and locations", () => {
    const { getByText } = render(
      <IntlProvider locale="en" messages={messages}>
        <Trip
          originCity={originCity}
          locations={locations}
          operators={operators}
          arrivalCity={arrivalCity}
          departure={departure}
        />
      </IntlProvider>
    );

    expect(getByText("MTL")).toBeInTheDocument();
    expect(getByText("NYC")).toBeInTheDocument();

    expect(getByText("location 1")).toBeInTheDocument();
    expect(getByText("location 1")).toBeInTheDocument();
  });

  test("should display the price", () => {
    const { getByText } = render(
      <IntlProvider locale="en" messages={messages}>
        <Trip
          originCity={originCity}
          locations={locations}
          operators={operators}
          arrivalCity={arrivalCity}
          departure={departure}
        />
      </IntlProvider>
    );

    expect(getByText("50.00 EUR")).toBeInTheDocument();
  });

  test("should display the buy button", () => {
    const { getByText } = render(
      <IntlProvider locale="en" messages={messages}>
        <Trip
          originCity={originCity}
          locations={locations}
          operators={operators}
          arrivalCity={arrivalCity}
          departure={departure}
        />
      </IntlProvider>
    );

    expect(getByText("Buy Now")).toBeInTheDocument();
  });
});
