import React from "react";
import { act, waitForDomChange, render, cleanup } from "@testing-library/react";
import { IntlProvider } from "react-intl";

import SearchResults from "./../SearchResults";
import messages from "./../../../../i18n/messages/en.json";
import { IDepartures, ITrips, IOperator } from "./../../../../api/ITicket";
import * as fetch from "./../../../../api/fetchTickets";

jest.useFakeTimers();

const departures1: IDepartures = {
  locations: new Map([
    ["location1", { id: "location1", name: "location 1" }],
    ["location2", { id: "location1", name: "location 2" }]
  ]),

  operators: new Map([
    ["operator1", { id: "operator1", name: "operator1" }]
  ]) as Map<string, IOperator>,
  departures: [
    {
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
    }
  ],
  isComplete: false
};

const departuresMore: IDepartures = {
  locations: new Map([
    ["location1", { id: "location1", name: "location 1" }],
    ["location2", { id: "location1", name: "location 2" }]
  ]),

  operators: new Map([
    ["operator1", { id: "operator1", name: "operator1" }]
  ]) as Map<string, IOperator>,
  departures: [
    {
      id: "departure2Id",
      arrivalTime: new Date("2020-08-02T06:33:00.000Z"),
      departureTime: new Date("2020-08-02T14:33:00.000Z"),
      operatorId: "operator1",
      arrivalLocationId: "location1",
      departureLocationId: "location2",
      prices: {
        currency: "EUR",
        total: 6000
      }
    }
  ],
  isComplete: true
};

const trips: ITrips = {
  originCity: {
    id: "originCityId",
    name: "NYC"
  },
  arrivalCity: {
    id: "arrivalCityId",
    name: "NYC"
  },
  ...departures1
};

afterEach(cleanup);

describe("SearchResults", () => {
  test("should call the API on mount and fetchmore", async () => {
    const mockFetchTicket = jest.spyOn(fetch, "getFirstTickets");
    mockFetchTicket.mockResolvedValue(trips);

    const { container } = render(
      <IntlProvider locale="en" messages={messages}>
        <SearchResults />
      </IntlProvider>
    );

    await waitForDomChange({ container });
    expect(mockFetchTicket).toHaveBeenCalledWith("en");
  });

  test("should call fetchMore when init is done with departures", async () => {
    const mockFetchTicket = jest.spyOn(fetch, "getFirstTickets");
    mockFetchTicket.mockResolvedValue(trips);

    const mockFetchMoreTicket = jest.spyOn(fetch, "getMoreTickets");
    mockFetchMoreTicket.mockResolvedValue(departuresMore);

    const { container } = render(
      <IntlProvider locale="en" messages={messages}>
        <SearchResults />
      </IntlProvider>
    );
    await waitForDomChange({ container });

    jest.runAllTimers();

    expect(mockFetchMoreTicket).toHaveBeenCalledWith("en", 1);
  });

  test("should call init when init is done without departures", async () => {
    const mockFetchTicket = jest
      .spyOn(fetch, "getFirstTickets")
      .mockReturnValueOnce(Promise.resolve({ ...trips, departures: [] }))
      .mockReturnValue(Promise.resolve({ ...trips, isComplete: true }));

    render(
      <IntlProvider locale="en" messages={messages}>
        <SearchResults />
      </IntlProvider>
    );

    expect(mockFetchTicket).toHaveBeenCalledTimes(3);
  });

  test("should loading on load", async () => {
    jest
      .spyOn(fetch, "getFirstTickets")
      .mockReturnValue(Promise.resolve(trips));

    const { getByAltText } = render(
      <IntlProvider locale="en" messages={messages}>
        <SearchResults />
      </IntlProvider>
    );

    expect(getByAltText("loader")).toBeInTheDocument();
  });

  test("should error message on error", async () => {
    jest
      .spyOn(fetch, "getFirstTickets")
      .mockReturnValue(Promise.reject("error"));

    const { container, getByText } = render(
      <IntlProvider locale="en" messages={messages}>
        <SearchResults />
      </IntlProvider>
    );
    await waitForDomChange({ container });

    expect(getByText("Retry")).toBeInTheDocument();
  });
});
