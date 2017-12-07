import React from 'react';
import { translate } from 'react-i18next';

import i18n from '../i18n/i18n';
import DepartureItem from './DepartureItem';
import '../styles/DepartureList.css';

const DepartureList = (props) => {
  const { t } = props;

  const sortedDepartures = () => props.departures.sort((dep1, dep2) => (
    dep1.departureDate > dep2.departureDate ? 1 : 0
  ));

  const emptyList = (
    <div className="notification">
      <p>{ t('msg.info_no_departures')}</p>
    </div>
  );

  return (
    (props.departures.length === 0) ? emptyList : (
      <div className="DepartureList">
        {
          sortedDepartures().map(departure => (
            <DepartureItem
              key={departure.id}
              departureDate={departure.departureDate}
              arrivalDate={departure.arrivalDate}
              origin={departure.origin}
              destination={departure.destination}
              price={departure.price}
              currency={departure.currency}
            />
          ))
        }
      </div>
    )
  );
};

translate.setI18n(i18n);
export default translate()(DepartureList);
