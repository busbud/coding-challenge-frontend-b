import API from "./api";

class Http {
  static getDepartures(origin, destination, outboundDate) {
    if (origin && destination && outboundDate) {
      return API.get(
        `x-departures/${origin}/${destination}/${outboundDate}?adult=1`
      ).then(httpResponse => {
        return httpResponse.data;
      });
    } else {
      return Promise.reject("One or more parameters are incorrectly defined.");
    }
  }
}

export default Http;
