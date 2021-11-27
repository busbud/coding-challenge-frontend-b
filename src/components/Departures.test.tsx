import { ComponentProps } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Departures from "./Departures";

describe("departures", () => {
  test("display loading", async () => {
    const props: ComponentProps<typeof Departures> = {
      departures: [],
      locations: [],
      loading: true,
    };
    const { getByRole } = render(<Departures {...props} />);
    expect(getByRole("progressbar")).toBeInTheDocument();
  });

  test("display error alert", async () => {
    const props: ComponentProps<typeof Departures> = {
      departures: [],
      locations: [],
      loading: false,
      hasError: true,
    };
    const { getByText, getByRole, queryByText } = render(
      <Departures {...props} />
    );
    expect(
      getByText("An error occured during the request. Please retry again.")
    ).toBeInTheDocument();
    userEvent.click(getByRole("button"));
    expect(
      queryByText("An error occured during the request. Please retry again.")
    ).not.toBeInTheDocument();
  });

  test("display list of departures", async () => {
    const props: ComponentProps<typeof Departures> = {
      departures: [
        {
          arrival_time: "2021-01-01 12:22",
          departure_time: "2021-01-01 08:00",
          prices: { currency: "EUR", total: 1200 },
          origin_location_id: 1,
          arrival_timezone: "America/Montreal",
          departure_timezone: "America/Montreal",
        },
      ],
      locations: [{ name: "Aéroport YUL", id: 1, address: [""] }],
      loading: false,
      hasError: false,
    };
    const { getByText } = render(<Departures {...props} />);
    expect(getByText("Departure time: {{date}}")).toBeInTheDocument();
  });
});
