import React from "react";
import Result from "../Result/Result";
import { useTranslation } from "react-i18next";
import "./ResultList.css";
import moment from "moment";

const formatDate = date => {
  return moment(date).format("MMMM Do YYYY");
};

const ResultList = ({ departures, locations, departureDate }) => {
  const { t } = useTranslation();
  return (
    <div className='result-list'>
      <h2 className='result-header'>
        {t("Here are all the results for")} {formatDate(departureDate)}
      </h2>
      {departures.map((result, index) => {
        const {
          id,
          departure_time,
          arrival_time,
          destination_location_id,
          origin_location_id,
          prices
        } = result;
        const tripPrice = (prices.total / 100).toFixed(2);
        const destinationLocationName = locations.filter(
          location => location.id === destination_location_id
        )[0].name;
        const originLocationName = locations.filter(
          location => location.id === origin_location_id
        )[0].name;
        const departureTime = moment(departure_time).format("LT");
        const arrivalTime = moment(arrival_time).format("LT");

        return (
          <Result
            key={index}
            id={id}
            departureTime={departureTime}
            arrivalTime={arrivalTime}
            tripPrice={tripPrice}
            destinationLocationName={destinationLocationName}
            originLocationName={originLocationName}
          />
        );
      })}
    </div>
  );
};

export default ResultList;
