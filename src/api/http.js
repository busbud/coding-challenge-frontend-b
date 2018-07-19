import API from "./api";
import { Observable, throwError } from "rxjs";
import counterpart from "counterpart";

import fakeData from "./fakeData";

class Http {
  static getDepartures(origin, destination, outboundDate) {
    if (origin && destination && outboundDate) {
      // return new Observable(observer => {
      //   Http.getDeparturesPoll(origin, destination, outboundDate, observer);
      // });
      return new Observable(observer => {
        observer.next(fakeData);
        observer.complete();
      });
    } else {
      return throwError("One or more parameters are incorrectly defined.");
    }
  }

  static getDeparturesPoll(origin, destination, outboundDate, observer, index) {
    const pollMode = typeof index !== "undefined";
    const url = `x-departures/${origin}/${destination}/${outboundDate}${
      pollMode ? "/poll" : ""
    }?adult=1${pollMode ? `&index=${index}` : ""}`;

    API.get(url)
      .then(httpResponse => {
        const result = httpResponse.data;
        const departuresSize = result.departures.length;

        if (departuresSize > 0) {
          observer.next(result);
        }

        if (result.complete === false) {
          setTimeout(() => {
            Http.getDeparturesPoll(
              origin,
              destination,
              outboundDate,
              observer,
              departuresSize + (pollMode ? index : 0)
            );
          }, 5000);
        } else {
          observer.complete();
        }
      })
      .catch(e => observer.error(e));
  }

  static getMatchedTowns(partielText) {
    const limit = 5;
    const locale = counterpart.getLocale();
    // Example : ttps://napi.busbud.com/search?q=Mon&limit=5&lang=fr&locale=fr
    const url = `search?q=${partielText}&limit=${limit}&lang=${locale}&locale=${locale}`;

    return API.get(url).then(httpResponse => httpResponse.data);
  }
}

export default Http;
