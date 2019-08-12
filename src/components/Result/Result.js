import React from "react";
import { useTranslation } from "react-i18next";
import "./Result.css";

const Result = ({
  departureTime,
  arrivalTime,
  tripPrice,
  destinationLocationName,
  originLocationName
}) => {
  const { t } = useTranslation();
  return (
    <div className='result-wrapper'>
      <div className='departure-result'>
        <h2>{t("Departs")}</h2>
        <h4>New York</h4>
        <p>{departureTime}</p>
        <h5 className='location'>{originLocationName}</h5>
      </div>
      <div className='arrival-result'>
        <h2>{t("Arrives")}</h2>
        <h4>Montreal</h4>
        <p>{arrivalTime}</p>
        <h5 className='location'>{destinationLocationName}</h5>
      </div>
      <div className='price-result'>
        <h2>${tripPrice} CAD</h2>
        <button className='buy-button'>
          <h2>{t("Buy Now")}</h2>
        </button>
      </div>
    </div>
  );
};

export default Result;
