import { Button } from '@material-ui/core';
import dayjs from 'dayjs';
import { darken } from 'polished';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { cities } from '../../constants';
import { getTicketsHandler } from '../service';
import CitySelector from './city-selector/city-selector';
import DateSelector from './date-selector/date-selector';
import PassengersSelector from './passengers-selector/passengers-selector';
 
const Div = styled.div`
  display: flexbox;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled(Button)`
  color: #fff;
  font-weight: bold;
  background-color: #64C5E2;
  height: 54px;
  &:hover {
    background-color: ${darken(0.1, '#64C5E2')};
  }
`

const Search: FunctionComponent<{
  getTickets: (
    origin: string,   
    destination: string,
    outboundDate: string,
    adult: number) => void;
}> = (props) => {
  const { t } = useTranslation();

  // TODO: Move to redux??
  // TODO: Reset destination  and origin when none is selected
  // TODO: Display labels
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(1);
  const [departureDate, setDepartureDate] = useState(dayjs());

  const adultsOptions = Array.from(Array(6).keys());

  const isDisabled = !origin || !destination || !adults || !departureDate;
  const handleSearch = () => {
    props.getTickets(origin, destination, dayjs(departureDate).format('YYYY-MM-DD'), adults)
  };

  return (
    <Div>
      <CitySelector label={t('search.input.leaving.label')} value={origin} handleChange={(hash: string) => setOrigin(hash)} options={cities.origin} labelId={'from'}/>
      <CitySelector label={t('search.input.to.label')} value={destination} handleChange={(hash: string) => setDestination(hash)} options={cities.destination} labelId={'to'}/>
      <PassengersSelector value={adults} handleChange={(e: any) => setAdults(e.target.value)} options={adultsOptions} /> 
      <DateSelector label={t('search.departure.input.label')} value={departureDate} handleChange={(e: any) => { console.log('e', e);setDepartureDate(e);}} />
      <ButtonContainer disabled={isDisabled} size="medium" onClick={handleSearch}>
        {t('search.button')}
      </ButtonContainer>
    </Div>
  );
};

const mapDispatchToProps = {
  getTickets: getTicketsHandler
}

export default connect(null, mapDispatchToProps)(Search);

