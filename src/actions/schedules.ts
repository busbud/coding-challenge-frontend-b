import { performGet, performPoll } from "../api";
import {
  TScheduleDepartureRequest,
  TScheduleDepartureResponse,
} from "../types";
import { actionTypes } from "./actionTypes";
import { Dispatch } from "redux";

export const getScheduledDepartues = (
  request: TScheduleDepartureRequest
): any => async (dispatch: Dispatch): Promise<void> => {
  const urlParams = {
    destination: request.destination,
    origin: request.origin,
    // NOTE: linting here is disabled due to external requirements
    // eslint-disable-next-line @typescript-eslint/naming-convention
    outbound_date: request.outboundDate,
  };

  const queryParams: Array<[string, any]> = [
    ["adult", request.adultTickets],
    ["child", request.childTickets],
    ["currency", request.currency],
    ["lang", request.lang],
    ["senior", request.seniorTickets],
  ];

  const onSuccess = (data: any) => {
    dispatch({
      payload: { data },
      type: actionTypes.DEPARTURE_FETCH_SUCCESS,
    });
  };

  try {
    // 1) Dispatch an action to trigger a loading state
    dispatch({
      currentRequest: request,
      type: actionTypes.DEPARTURE_FETCH_START,
    });

    // 2) Send off the request to the API
    const response: TScheduleDepartureResponse = await performGet(
      "scheduledDeparturesV2",
      queryParams,
      urlParams
    );

    if (response.complete) {
      // 3) if the data is completely loaded, dispatch it
      // to the reducer
      onSuccess(response.departures);
    } else {
      // 4) If we don't get a completed request, we need to poll
      // until the request is finished
      //
      // NOTE: We need to pass in an successCallback handler here
      // to dispatch an action once the data is available, as the
      // api interaction generics should _not_ be dispatched
      performPoll({
        endpoint: "scheduledDeparturesV2",
        index: 0,
        queryParams,
        successCallback: (data: TScheduleDepartureResponse) => {
          onSuccess(data.departures);
        },
        urlParams,
      });
    }
    return;
  } catch (err) {
    dispatch({
      error: err,
      type: actionTypes.DEPARTURE_FETCH_ERROR,
    });
  }
};
