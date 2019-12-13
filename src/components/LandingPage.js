import React, { useEffect, useState } from "react";
import axios from "axios";
import DepartureList from "./DeparturesList";
import { DATE, DESTINATION, ORIGIN } from "../constants";

//TODO How I treat the date ? timezonewise ?

const LandingPage = () => {
  const [searchResult, setSearchResult] = useState([]);

  //TODO make the API key an env variable not committed
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios({
        method: "GET",
        url: `https://napi.busbud.com/x-departures/${ORIGIN}/${DESTINATION}/${DATE}`,
        headers: {
          Accept: "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
          "X-Busbud-Token": "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
        },
        params: {
          adult: 1,
          child: 0,
          senior: 0,
          lang: "en",
          currency: "USD"
        }
      });
      setSearchResult(response.data);
    };
    fetchData();
  }, []);
  return <div>{searchResult.length !== 0 && <DepartureList searchResult={searchResult} />}</div>;
};

export default LandingPage;
