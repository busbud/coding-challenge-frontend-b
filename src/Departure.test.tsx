import { render } from "@testing-library/react";
import Departure from "./Departure";

describe("Departure", () => {
  test("display departure time, the arrival time, the location name and the price", () => {
    const { getByText } = render(
      <Departure
        departureTime="2021-11-25T20:45:00"
        arrivalTime="2021-11-25T22:45:00"
        location="Central station"
        price={1122}
      />
    );
    expect(getByText("Departure time: {{date}}")).toBeInTheDocument();
    expect(getByText("Arrival time: {{date}}")).toBeInTheDocument();
    expect(getByText("Location: {{location}}")).toBeInTheDocument();
    expect(getByText("Price: {{price}}")).toBeInTheDocument();
  });
});
