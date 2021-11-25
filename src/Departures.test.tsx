import { ComponentProps } from "react";
import { render } from "@testing-library/react";
import mockAxios from "jest-mock-axios";
import Departures from "./Departures";

describe("departures", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test("call api endpoint", async () => {
    const props: ComponentProps<typeof Departures> = {
      date: "2021-01-01",
      destination: "aaaaaa",
      origin: "zzzzzz",
      passengers: 1,
    };
    mockAxios.get.mockResolvedValue({ departures: [] });
    render(<Departures {...props} />);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/x-departures/${props.origin}/${props.destination}/${props.date}`,
      { params: { adult: props.passengers } }
    );
  });
});
