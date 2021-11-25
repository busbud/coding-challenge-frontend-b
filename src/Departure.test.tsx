import { render } from "@testing-library/react";
import Departure from "./Departure";

describe("Departure", () => {
  test("display departure time, the arrival time, the location name and the price", () => {
    const { getByText } = render(<Departure />);
    expect(getByText("Departure time:")).toBeInTheDocument();
    expect(getByText("Arrival time:")).toBeInTheDocument();
    expect(getByText("Location:")).toBeInTheDocument();
    expect(getByText("Price:")).toBeInTheDocument();
  });
});
