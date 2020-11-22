import { Card, CardContent } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Location, State, XDeparture } from '../../main/types';
import * as searchSelectors from '../search/selectors';

const CardsContainer = styled.section`
  display: flex;
  width: 1200px;
  max-width: 80%;
  margin: 30px auto 20px;
  padding: 0;
  flex-wrap: wrap;
  
  @media (min-width: 1034px) {
    & .MuiCard-root:nth-child(odd) {
      margin-right: 2%;
    }
  }
`;

const CardContainer = styled(Card)`
  width: 49%;
  min-width: 400px;
  margin-bottom: 15px;

  @media (max-width: 1034px) {
    width: 100%;
  }
`;

const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY HH:MM');

const Tickets: FunctionComponent<{
  departures?: XDeparture[],
  locations?: Location[]
}> = (props) => {
  const { departures, locations } = props;
  const { t } = useTranslation();

  const getLocation = (locationId: number) => 
    locations?.find((location) => location.id === locationId)?.address;
  
  return (
    <CardsContainer>
      {
        departures?.map((departure) => 
          <CardContainer key={departure.id} variant="outlined">
            <CardContent>
              <h3>{t('tickets.departure.title')}</h3>
              {formatDate(departure.departure_time)}
              <h3>{t('tickets.arrival.title')}</h3>
              {formatDate(departure.arrival_time)}
              <h3>{t('tickets.location.title')}</h3>
              {getLocation(departure.origin_location_id)}
              <h3>{t('tickets.price.title')}</h3>
              {`${departure.prices.total} ${departure.prices.currency}`} 
            </CardContent>
          </CardContainer>
        )
      }
    </CardsContainer>
  );
};

const mapStateToProps = (state: State) => {
  return {
    locations: searchSelectors.getLocations(state),
    departures: searchSelectors.getDepartures(state),
  }
}

export default connect(mapStateToProps, null)(Tickets);