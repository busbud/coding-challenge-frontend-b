/* eslint-disable no-underscore-dangle */
// @flow
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import StopList from '../StopList';
import AmenitiesToggle from './AmenitiesToggle';
import config from '../../config';
import { ReactComponent as OrleansExpressLogo } from '../../assets/images/logo-orleans-express.svg';
import {
  CardWrapper,
  ContentWrapper,
  CardHeader,
  CTA,
  TripWrapper,
  PlanWrapper,
} from './styledComponent';

const operatorLogo = {
  'Orléans Express': <OrleansExpressLogo />,
};

type Props = {
    stops: Array<Object>,
    amenities: Object,
    tripPrice: Number,
    tripDuration: Number,
    departureTime: String,
    operator: Object,
}

function toViewModel(amenities) {
  return Object.keys(amenities).filter((item) => amenities[item] === true);
}

function ResultCard(props: Props) {
  const {
    stops,
    amenities,
    tripPrice,
    tripDuration,
    departureTime,
    operator,
  } = props;
  const { t } = useTranslation();
  const { festivalTicketPrices } = config;

  const [planSelected, setPlanSelected] = useState('basic');

  const duration = moment.duration({ minutes: tripDuration });

  const price = parseInt((tripPrice.total / 100), 10);
  const discount = 10;
  const planSelectedPrice = parseInt(festivalTicketPrices[planSelected], 10);
  const planSelectedPriceWithDiscount = planSelectedPrice - ((planSelectedPrice * discount) / 100);

  const totalPrice = planSelectedPriceWithDiscount + price;

  return (
    <CardWrapper>
      <CardHeader>
        <h2>{t(`result_card_plan_title_${planSelected}`)}</h2>
        {operatorLogo[operator.name]}
      </CardHeader>
      <p>{t(`result_card_plan_content_${planSelected}`)}</p>
      <PlanWrapper>
        {Object.keys(festivalTicketPrices).map((item) => {
          return (
            <button
              type="button"
              key={item}
              value={item}
              className={`${item} ${planSelected === item ? 'active' : ''}`}
              onClick={(e) => setPlanSelected(e.target.value)}
            >
              {`$${festivalTicketPrices[item]}`}
              <span>CAD</span>
            </button>
          );
        })}
      </PlanWrapper>
      <h3>{t('result_card_saved', { saved: ((planSelectedPrice * discount) / 100) })}</h3>
      <TripWrapper>
        <ContentWrapper>
          <h4>{t('result_card_trip_title')}</h4>
          <h4 className="price">
            {`$${price}`}
            <span>CAD</span>
          </h4>
        </ContentWrapper>
        <ContentWrapper>
          <small>{moment(departureTime).format('DD MMMM YYYY HH:mm')}</small>
          <small>{t('result_card_trip_duration', { duration: `${duration._data.hours}:${duration._data.minutes}` })}</small>
        </ContentWrapper>
        <AmenitiesToggle
          amenities={toViewModel(amenities)}
        />
        <StopList
          stops={stops}
        />
      </TripWrapper>
      <CTA>
        {t('result_card_cta', {
          total: totalPrice,
        })}
      </CTA>
    </CardWrapper>
  );
}

export default ResultCard;
