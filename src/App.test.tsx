import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fakeResponse } from "./test-utils";
import * as api from "./api";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get("*", (req, res, ctx) => {
    return res(ctx.json(fakeResponse));
  })
);

beforeAll(() => server.listen());
beforeEach(() => jest.restoreAllMocks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<App/>", () => {
  it("renders", () => {
    render(<App />);
  });

  test("initial search date matches start of festival", () => {
    render(<App />);
    const input = screen.getByLabelText(/departure date/gi);
    expect((input as HTMLInputElement).defaultValue).toEqual(
      api.getFestivalStartDate()
    );
  });

  test("user can search for departures", async () => {
    render(<App />);
    jest.spyOn(api, "getDepartures");
    userEvent.click(screen.getByText(/search/i));
    await waitFor(() =>
      expect(api.getDepartures).toHaveBeenCalledWith({
        departureDate: api.getFestivalStartDate(),
      })
    );
    expect(api.getDepartures).toHaveBeenCalledTimes(1);
  });

  test("user can search for custom date", async () => {
    const fakeDate = "1111-11-11";
    render(<App />);
    const input = screen.getByLabelText(/departure date/gi);
    jest
      .spyOn(api, "getDepartures")
      .mockResolvedValueOnce([fakeResponse, undefined]);
    fireEvent.change(input, { target: { value: fakeDate } });
    userEvent.click(screen.getByText(/search/i));
    await waitFor(() =>
      expect(api.getDepartures).toHaveBeenCalledWith({
        departureDate: fakeDate,
      })
    );
    expect(api.getDepartures).toHaveBeenCalledTimes(1);
  });
});
