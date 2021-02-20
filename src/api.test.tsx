import { getDepartures, getFestivalStartDate, cities } from "./api";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fakeResponse } from "./test-utils";
import { ApiResponse } from "./types";

const server = setupServer(
  rest.get("*", (req, res, ctx) => {
    return res(ctx.json(fakeResponse));
  })
);

beforeAll(() => server.listen());
beforeEach(() => jest.restoreAllMocks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("getDepartures", () => {
  it("should error if REACT_APP_API_TOKEN not set", async () => {
    let token = process.env.REACT_APP_API_TOKEN;
    delete process.env.REACT_APP_API_TOKEN;
    await expect(getDepartures()).rejects.toThrow("API Token not set");
    process.env.REACT_APP_API_TOKEN = token;
  });

  it("should error if REACT_APP_API_ENDPOINT not set", async () => {
    let endpoint = process.env.REACT_APP_API_ENDPOINT;
    delete process.env.REACT_APP_API_ENDPOINT;
    await expect(getDepartures()).rejects.toThrow("API Endpoint not set");
    process.env.REACT_APP_API_ENDPOINT = endpoint;
  });

  it("should make initial request for festival start date", async () => {
    const date = getFestivalStartDate();
    const mockFetch = jest.spyOn(global, "fetch");
    await getDepartures();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toMatch(date);
  });

  it("should make request with correct origin and destination", async () => {
    const mockFetch = jest.spyOn(global, "fetch");
    await getDepartures();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toMatch(
      `${cities.quebec}/${cities.montreal}`
    );
  });

  it("should return array with response first", async () => {
    const [departures] = await getDepartures();
    expect(departures).toEqual(fakeResponse);
  });

  it("should return array with polling parameters second", async () => {
    const unfinishedResponse: ApiResponse = {
      ...fakeResponse,
      complete: false,
    };
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.json(unfinishedResponse));
      })
    );
    const [, next] = await getDepartures();
    expect(next).toEqual({
      poll: true,
      index: fakeResponse.departures.length,
    });
  });

  it("should add poll to the fetch url", async () => {
    const unfinishedResponse: ApiResponse = {
      ...fakeResponse,
      complete: false,
    };
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.json(unfinishedResponse));
      })
    );
    const mockFetch = jest.spyOn(global, "fetch");
    const [, next] = await getDepartures();
    await getDepartures(next);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(mockFetch.mock.calls[1][0]).toMatch(/poll/);
  });

  it("should increment index based on response", async () => {
    const unfinishedResponse: ApiResponse = {
      ...fakeResponse,
      complete: false,
    };
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.json(unfinishedResponse));
      })
    );
    const [, next] = await getDepartures();
    expect(next?.index).toEqual(unfinishedResponse.departures.length);
    const [, nextParams] = await getDepartures(next);
    expect(nextParams?.index).toEqual(2 * unfinishedResponse.departures.length);
  });

  it("should return undefined next params if complete", async () => {
    const finishedResponse: ApiResponse = {
      ...fakeResponse,
      complete: true,
    };
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.json(finishedResponse));
      })
    );
    const [, next] = await getDepartures();
    expect(next).toBeUndefined();
  });

  it.todo("should keep other query parameters in subsequent calls");
});
