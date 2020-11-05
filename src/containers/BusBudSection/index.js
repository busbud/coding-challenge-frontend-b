// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SectionWrapper,
  CardsWrapper,
  FormWrapper,
} from './styledComponent';
import withBusBudData from '../../context/withBusBudData';
import { makeLazy } from '../../utils/makeLazy';
import Form from '../../components/Form';
import Banner from '../../components/Banner';
import { LazyResult } from '../../components/ResultCard/styledComponent';

type Props = {
  busBudData: Object,
  onSubmit: Function,
}

function BusBudSection(
  props: Props
) {
  const {
    busBudData,
    onSubmit,
  } = props;

  const { t } = useTranslation();

  const ResultCard = makeLazy(() => import('../../components/ResultCard'), <LazyResult />);

  return (
    <SectionWrapper>
      <FormWrapper style={{ flexBasis: '33%' }}>
        {(busBudData.data !== null && busBudData.data.departures.length === 0) && (
          <Banner
            type="error"
            title={t('busbud_no_departures_error_title')}
            content={t('busbud_no_departures_error_content')}
          />
        )}
        {(busBudData.error !== null && (
          <Banner
            type="error"
            content={busBudData.error.message}
          />
        ))}
        <Form
          onSubmit={(e) => onSubmit(e)}
        />
      </FormWrapper>
      {(busBudData && busBudData.data !== null) && (
      <CardsWrapper>
        {busBudData.data.departures.map((dep) => {
          return (
            <ResultCard
              key={dep.busbud_departure_id}
              stops={dep.trip_stops}
              amenities={dep.amenities}
              tripPrice={dep.prices}
              tripDuration={dep.duration}
              departureTime={dep.departure_time}
              operator={busBudData.data.operators[0]}
            />
          );
        })}
      </CardsWrapper>
      )}
    </SectionWrapper>
  );
}

export default withBusBudData(BusBudSection);
