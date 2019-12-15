import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { DATE, DESTINATION, ORIGIN } from "../constants";
import { busbudToken } from "../keys";

export const useDeparturesData = () => {
  const [searchResult, setSearchResult] = useState(null);
  const initialMount = useRef(true);
  useEffect(
    () => {
      const fetchData = async () => {
        const response = await axios({
          method: "GET",
          url: `https://napi.busbud.com/x-departures/${ORIGIN}/${DESTINATION}/${DATE}`,
          headers: {
            Accept: "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
            "X-Busbud-Token": busbudToken
          },
          params: {
            adult: 1,
            child: 0,
            senior: 0,
            lang: "en",
            currency: "USD",
            index: searchResult ? searchResult.departures.length : 0
          }
        });
        setSearchResult(response.data);
      };

      if (initialMount.current) {
        fetchData();
        initialMount.current = false;
      }
      if (searchResult && !searchResult.complete) {
        setTimeout(fetchData, 2000);
      }
    },
    [searchResult]
  );

  return [searchResult];
};
