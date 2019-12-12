import React from "react";
import "./Departure.scss";

const Departure = ({
  arrival_time,
  available_seats,
  complete,
  departure_time,
  duration,
  prices,
  seatClass,
  from,
  to
}) => {
  return (
    <div className={`departure ${complete ? "departure--complete" : ""}`}>
      <div className="departure__content">
        <p className="departure__content__label">From</p>
        <div className="departure__content__location">
          <p>{from}</p>
          <p>{new Date(departure_time).toLocaleString()}</p>
        </div>
        <p className="departure__content__arrow">&rarr;</p>
        <p className="departure__content__label">To</p>
        <div className="departure__content__location">
          <p>{to}</p>
          <p>{new Date(arrival_time).toLocaleString()}</p>
        </div>
        <div className="departure__content__duration">
          <span>Duration: </span>
          {duration}
        </div>
      </div>
      <div className="departure__reservation">
        <div className="departure__reservation__availability">
          <div>{seatClass}</div>
          <p>{complete ? "Complete" : `Available seats: ${available_seats}`}</p>
        </div>
        <div className="departure__reservation__price">
          {prices.total} {prices.currency}
        </div>
        <button>Book</button>
      </div>
    </div>
  );
};

export default Departure;
