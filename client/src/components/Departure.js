import React from "react";
import LocalizedStrings from "react-localization";
import "./Departure.scss";

let strings = new LocalizedStrings({
  en: {
    from: "From",
    to: "To",
    when: "When",
    book: "Book",
    duration: "Duration: ",
    complete: "Complete",
    seats: "Available seats:"
  },
  fr: {
    from: "Depuis",
    to: "Vers",
    when: "Date",
    book: "Réserver",
    duration: "Durée : ",
    complete: "Complet",
    seats: "Sièges disponibles :"
  }
});

const Departure = ({
  arrival_time,
  available_seats,
  complete,
  departure_time,
  duration,
  prices,
  seatClass,
  from,
  to,
  lang
}) => {
  strings.setLanguage(lang);
  return (
    <div className={`departure ${complete ? "departure--complete" : ""}`}>
      <div className="departure__content">
        <p className="departure__content__label">{strings.from}</p>
        <div className="departure__content__location">
          <p>{from}</p>
          <p>{new Date(departure_time).toLocaleString(lang)}</p>
        </div>
        <p className="departure__content__arrow">&rarr;</p>
        <p className="departure__content__label">{strings.to}</p>
        <div className="departure__content__location">
          <p>{to}</p>
          <p>{new Date(arrival_time).toLocaleString(lang)}</p>
        </div>
        <div className="departure__content__duration">
          <span>{strings.duration}</span>
          {duration}
        </div>
      </div>
      <div className="departure__reservation">
        <div className="departure__reservation__availability">
          <div>{seatClass}</div>
          <p>
            {complete
              ? strings.complete
              : `${strings.seats} ${available_seats}`}
          </p>
        </div>
        <div className="departure__reservation__price">
          {prices.total} {prices.currency}
        </div>
        <button>{strings.book}</button>
      </div>
    </div>
  );
};

export default Departure;
