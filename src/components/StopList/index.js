// @flow
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Stop from '../Stop';
import { StyledButton } from './styledComponents';
import { ReactComponent as ChevronIcon } from '../../assets/images/chevron-icon.svg';
import { ReactComponent as ThreeDots } from '../../assets/images/three-dots.svg';

type StopType = {
  arrival_time?: String, //eslint-disable-line
  departure_time?: String, //eslint-disable-line
  departure_operator_id?: String, //eslint-disable-line 
  departure_time: String,
  name: String,
}

type Props = {
  stops: Array<StopType>,
}

function StopsList(props: Props) {
  const {
    stops,
  } = props;

  const { t } = useTranslation();

  const [showStops, setShowStops] = useState(false);

  const firstStop = stops[0];
  const lastStop = stops[stops.length - 1];

  return (
    <>
      {stops.length >= 1 && (
        <div>
          <Stop
            time={firstStop.departure_time}
            stopName={firstStop.name}
            isFirstOfRoute
          />
          {(stops.length > 2) && (
            <StyledButton
              onClick={() => setShowStops(!showStops)}
              showStops={showStops}
            >
              {!showStops && (<ThreeDots className="three-dots" />)}
              <ChevronIcon className="chevron" />
              {t('stops_details', {
                stops: stops.length,
              })}
            </StyledButton>
          )}
          {showStops && (
          <>
            {stops.map((stop, i) => {
              if (i !== 0 && i !== stops.length - 1) {
                return (
                  <Stop
                    key={`${stop.name + i}`}
                    time={stop.arrival_time || stop.departure_time}
                    stopName={stop.name}
                  />
                );
              } return null;
            })}
          </>
          )}
          <Stop
            time={lastStop.arrival_time || lastStop.departure_time}
            stopName={lastStop.name}
            isLastOfRoute
          />
        </div>
      )}
    </>
  );
}

export default StopsList;
