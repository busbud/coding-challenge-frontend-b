import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import reducer, {
  setError,
  startTicketsFetching,
  stopTicketsFetching,
  updateCities,
  updateComplete,
  updateLocations,
  updateTickets,
} from "./tickets";

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

  // @todo: test thunk functions
  // describe("Thunk fetchTicketsPoll", () => {
  //   const dispatch: jest.Mock<AppDispatch> = jest.fn();
  //   const getState: jest.Mock<RootState> = jest.fn().mockReturnValue({
  //     search: { adult: 0 },
  //     tickets: {
  //       loading: false,
  //       tickets: [],
  //       locations: [],
  //       cities: [],
  //       complete: false,
  //       fetchedOneTime: false,
  //     },
  //   } as unknown as RootState);
  //   let getDeparturesFromQuebecToMontrealPollSpy: jest.SpyInstance;
  //
  //   beforeEach(() => {
  //     getDeparturesFromQuebecToMontrealPollSpy = jest
  //       .spyOn(busbudLib, "getDeparturesFromQuebecToMontrealPoll")
  //       .mockResolvedValueOnce({
  //         data: {
  //           complete: true,
  //           departures: [{ id: "1" }, { id: "2" }],
  //           locations: [{ id: 1 }, { id: 2 }],
  //         },
  //       } as AxiosResponse);
  //   });
  //
  //   it("should handle tickets polled and set complete, locations & tickets data", async () => {
  //     await fetchTicketsPoll()(dispatch, getState, {});
  //     expect(dispatch).toHaveBeenCalledTimes(3);
  //     expect(dispatch).toHaveBeenLastCalledWith(
  //       updateTickets({
  //         tickets: [
  //           { id: "1" },
  //           { id: "2" },
  //         ] as RootState["tickets"]["tickets"],
  //       })
  //     );
  //   });
  // });
});
