import { AnyAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppDispatch, RootState } from "../store";
import reducer, {
  fetchTicketsPoll,
  setError,
  startTicketsFetching,
  stopTicketsFetching,
  updateCities,
  updateComplete,
  updateLocations,
  updateTickets,
} from "./tickets";
import * as busbudLib from "../../lib/busbud";

jest.mock("../../lib/busbud");

describe("tickets", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual({
      loading: false,
      tickets: [],
      locations: [],
      cities: [],
      complete: false,
      fetchedOneTime: false,
    });
  });

  it("should set loading if we start fetching data", () => {
    expect(
      reducer(
        {
          loading: true,
          tickets: [],
          locations: [],
          cities: [],
          complete: false,
          fetchedOneTime: false,
        },
        startTicketsFetching()
      )
    ).toEqual({
      loading: true,
      tickets: [],
      locations: [],
      cities: [],
      complete: false,
      fetchedOneTime: false,
    });
  });

  it("should unset loading if we stop fetching data", () => {
    expect(
      reducer(
        {
          loading: true,
          tickets: [],
          locations: [],
          cities: [],
          complete: false,
          fetchedOneTime: false,
        },
        stopTicketsFetching()
      )
    ).toEqual({
      loading: false,
      tickets: [],
      locations: [],
      cities: [],
      complete: false,
      fetchedOneTime: true,
    });
  });

  it("should handle tickets to existing tickets", () => {
    expect(
      reducer(
        {
          loading: true,
          tickets: [{ id: "1" }],
          locations: [],
          cities: [],
          complete: false,
          fetchedOneTime: false,
        } as unknown as RootState["tickets"],
        updateTickets({
          tickets: [{ id: "2" }] as RootState["tickets"]["tickets"],
        })
      )
    ).toEqual({
      loading: true,
      tickets: [{ id: "1" }, { id: "2" }],
      locations: [],
      cities: [],
      complete: false,
      fetchedOneTime: false,
    });
  });

  it("should handle locations to existing locations", () => {
    expect(
      reducer(
        {
          loading: true,
          tickets: [],
          locations: [{ id: 1 }],
          cities: [],
          complete: false,
          fetchedOneTime: false,
        } as unknown as RootState["tickets"],
        updateLocations({
          locations: [
            {
              id: 2,
            },
          ] as RootState["tickets"]["locations"],
        })
      )
    ).toEqual({
      loading: true,
      tickets: [],
      locations: [{ id: 1 }, { id: 2 }],
      cities: [],
      complete: false,
      fetchedOneTime: false,
    });
  });

  it("should handle cities to existing cities", () => {
    expect(
      reducer(
        {
          loading: true,
          tickets: [],
          locations: [],
          cities: [
            {
              id: "1",
            },
          ],
          complete: false,
          fetchedOneTime: false,
        } as unknown as RootState["tickets"],
        updateCities({
          cities: [
            {
              id: "2",
            },
          ] as RootState["tickets"]["cities"],
        })
      )
    ).toEqual({
      loading: true,
      tickets: [],
      locations: [],
      cities: [{ id: "1" }, { id: "2" }],
      complete: false,
      fetchedOneTime: false,
    });
  });

  it("should handle a complete value", () => {
    expect(
      reducer(
        { complete: false } as RootState["tickets"],
        updateComplete({ complete: true })
      )
    ).toEqual({ complete: true });
    expect(
      reducer(
        { complete: true } as RootState["tickets"],
        updateComplete({ complete: false })
      )
    ).toEqual({ complete: false });
  });

  it("should set an error", () => {
    expect(reducer(undefined, setError())).toEqual({
      loading: false,
      tickets: [],
      locations: [],
      cities: [],
      complete: false,
      fetchedOneTime: false,
      error: true,
    });
  });

  describe("Thunk fetchTicketsPoll", () => {
    const dispatch: jest.Mock<AppDispatch> = jest.fn();
    const getState: jest.Mock<RootState> = jest.fn();
    const getDeparturesFromQuebecToMontrealPollSpy: jest.SpyInstance =
      jest.spyOn(busbudLib, "getDeparturesFromQuebecToMontrealPoll");

    const returnGetState = {
      search: { adult: 0 },
      tickets: {
        loading: false,
        tickets: [],
        locations: [],
        cities: [],
        complete: false,
        fetchedOneTime: false,
      },
    } as unknown as RootState;

    beforeEach(() => {
      jest.clearAllMocks();
      getDeparturesFromQuebecToMontrealPollSpy.mockResolvedValueOnce({
        data: {
          complete: true,
          departures: [{ id: "1" }, { id: "2" }],
          locations: [{ id: 1 }, { id: 2 }],
        },
      } as AxiosResponse);
      getState.mockReturnValueOnce(returnGetState);
    });

    it("should handle tickets polled once and set data once if is complete", async () => {
      await fetchTicketsPoll()(dispatch, getState, {});
      expect(getState).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(5);
      expect(dispatch).toHaveBeenCalledWith(startTicketsFetching());
      expect(dispatch).toHaveBeenCalledWith(
        updateTickets({
          tickets: [
            { id: "1" },
            { id: "2" },
          ] as RootState["tickets"]["tickets"],
        })
      );
      expect(dispatch).toHaveBeenCalledWith(
        updateLocations({
          locations: [
            { id: 1 },
            { id: 2 },
          ] as RootState["tickets"]["locations"],
        })
      );
      expect(dispatch).toHaveBeenCalledWith(updateComplete({ complete: true }));
      expect(dispatch).toHaveBeenCalledWith(stopTicketsFetching());
    });
  });
});
