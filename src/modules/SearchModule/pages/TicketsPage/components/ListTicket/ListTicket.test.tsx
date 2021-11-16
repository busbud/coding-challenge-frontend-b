import React from "react";
import { render } from "../../../../../../test-utils";
import ListTicket from "./ListTicket";
import { RootState } from "../../../../../../redux/store";
import { TicketsDTOOutput } from "../../../../../../lib/types/busbud";

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

describe("<ListTicket />", () => {
  it("should render the ListTicket component correctly", () => {
    const { baseElement } = render(<ListTicket tickets={[ticket]} />, {
      preloadedState: storeInitialState,
    });
    expect(baseElement).toBeTruthy();
  });
});
