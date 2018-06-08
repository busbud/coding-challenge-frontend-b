/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { translate } from 'react-i18next';

import './styles/DepartureItemLocation.scss';

const formatDatetime = (datetime, timezone, languageCode) => DateTime
  .fromISO(datetime)
  .setZone(timezone)
  .setLocale(languageCode)
  .toLocaleString(DateTime.DATETIME_MED);

function DepartureItemLocation(props) {
  const {
    city,
    time,
    timezone,
    i18n,
    t,
  } = props;

  const currentLanguage = i18n.language;

  return (
    <div className="DepartureItemLocation">
      <div className="DepartureItemLocation__city">{city}</div>
      <div className="DepartureItemLocation__date">
        {t('departure', {
          date: formatDatetime(time, timezone, currentLanguage),
        })}
      </div>
    </div>
  );
}

DepartureItemLocation.propTypes = {
  city: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('translations')(DepartureItemLocation);
