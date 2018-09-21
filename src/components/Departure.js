import React, { Component } from "react";
import { translate }        from "react-i18next";
import LngDetector          from 'i18next-browser-languagedetector';

class Departure extends Component {
  formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    }
    return new Date(date).toLocaleString(LngDetector, options);
  }
  render() {
    const { t, departure } = this.props;
    return (
      <div className="departure flex flex-column align-itmes-center">
        <section className="flex flex-wrap justify-space-between align-items-center">
          <h3 className="departure-name">{departure.location.name}</h3>
          <div className="departure-price">${departure.price}</div>
        </section>
        <section className="departure-address">
          {departure.location.address ? departure.location.address.map((addressLine, index) => {
              return <p key={index}>{addressLine}</p>;
            }) : (
            <p>{ t("departure.noAddress") }</p>
          )}
        </section>
        <section className="departure-info flex flex-wrap justify-space-around">
          <div className="info-block">
            <p className="label">{ t("departure.departureTime") }</p>
            <p className="time">{this.formatDate(departure.departureTime)}</p>
          </div>
          <div className="info-block">
            <p className="label">{ t("departure.arrivalTime") }</p>
            <p className="time">{this.formatDate(departure.arrivalTime)}</p>
          </div>
        </section>
      </div>
    );
  }
}

export default translate("common")(Departure);