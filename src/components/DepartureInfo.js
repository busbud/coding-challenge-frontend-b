import React from "react";
import { withNamespaces } from "react-i18next";

import {
  formatTime,
  formatPrice,
  findLocationName
} from "../utils/format-departure-info-helper";

@withNamespaces()
export default class DepartureInfo extends React.Component {
  render() {
    const { departure, locations, t } = this.props;
    const {
      arrival_time,
      departure_time,
      destination_location_id,
      origin_location_id,
      prices: { total }
    } = departure;
    return (
      <div className="departure-info-container">
        <div className="schedule-info">
          <div className="row">
            <div className="time">
              {t("Departure")}: {formatTime(departure_time)}
            </div>
            <div className="location">
              {findLocationName(origin_location_id, locations)}
            </div>
          </div>
          <div className="row">
            <div className="time">
              {t("Arrival")}: {formatTime(arrival_time)}
            </div>
            <div className="location">
              {findLocationName(destination_location_id, locations)}
            </div>
          </div>
        </div>
        <div className="schedule-details">
          <div className="price">${formatPrice(total)} USD</div>
        </div>
      </div>
    );
  }
}
