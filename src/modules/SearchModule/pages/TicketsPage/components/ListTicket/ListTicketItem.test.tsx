import React from "react";
import ListTicketItem from "./ListTicketItem";
import { render } from "../../../../../../test-utils";
import { TicketsDTOOutput } from "../../../../../../lib/types/busbud";
import { RootState } from "../../../../../../redux/store";

const storeInitialState = {
  tickets: {
    cities: [
      {
        id: "1",
        name: "nameCity1",
      },
      {
        id: "2",
        name: "nameCity2",
      },
    ],
    locations: [
      {
        id: 1,
        name: "nameLocation1",
        city_id: "1",
      },
      {
        id: 2,
        name: "nameLocation2",
        city_id: "2",
      },
    ],
  },
} as RootState;

const ticket = {
  id: "1",
  prices: { currency: "USD", total: 5000 },
  departure_time: new Date("2021-12-12 06:00"),
  arrival_time: new Date("2021-12-12 19:00"),
  origin_location_id: 1,
  destination_location_id: 2,
} as TicketsDTOOutput["departures"][0];

describe("<ListTicketItem />", () => {
  it("should render the ListTicketItem", () => {
    const { baseElement, getByText } = render(
      <ListTicketItem ticket={ticket} />,
      { preloadedState: storeInitialState }
    );
    expect(baseElement).toBeTruthy();
    expect(
      getByText(`${ticket.prices.currency} ${ticket.prices.total / 100}`)
    ).toBeTruthy();
    expect(getByText("06:00 AM")).toBeTruthy();
    expect(getByText("07:00 PM")).toBeTruthy();
    expect(getByText(storeInitialState.tickets.cities[0].name)).toBeTruthy();
    expect(getByText(storeInitialState.tickets.cities[1].name)).toBeTruthy();
    expect(getByText(storeInitialState.tickets.locations[0].name)).toBeTruthy();
    expect(getByText(storeInitialState.tickets.locations[1].name)).toBeTruthy();
  });
});
