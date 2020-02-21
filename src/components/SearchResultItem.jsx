import React from 'react';
import styled from 'styled-components';
import { Row, Container, Col } from 'styled-bootstrap-grid';
import TimeRange from './TimeRange';
import Price from './Price';
import Location from './Location';
import { formatDate } from '../utils/format';
import LocationMap from './LocationMap';
import { useTranslation } from 'react-i18next';

const Card = styled.div`
  border-radius: 4px;
  padding: 2rem;
  margin: 3rem 0;
  background-color: white;
  -webkit-box-shadow: rgba(0, 0, 0, 0.25);
  -moz-box-shadow: rgba(0, 0, 0, 0.25);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  .hidden {
    display: none;
  }

  /* &:hover, */
  &.selected {
    transform: scale(1.02);

    .hidden {
      display: flex;
    }
  }
`;

const Avatar = styled.img`
  width: 100px;
  margin-right: 1.5rem;
  display: none;

  @media (min-width: 800px) {
    display: block;
  }
`;

const OperatorName = styled.div`
  font-weight: 500;
  color: #565757;
`;

const Left = styled.div`
  float: left;
  display: flex;
  align-items: center;
`;

const FullDate = styled.p`
  margin-top: 5px;
  color: #ab216c;
`;

const MapWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  height: 100%;
  overflow: hidden;
  display: flex;
  border-radius: 4px;
`;

function SearchResultItem({
  id,
  operator = {},
  departure = {},
  arrival = {},
  price,
  selected = false,
  onClick
}) {
  const { t } = useTranslation();
  return (
    <Card className={selected ? 'selected' : ''}>
      <Container>
        <Row alignItems='center' onClick={() => onClick(id)}>
          <Col col>
            <Left>
              <Avatar
                src={operator.logo_url}
                alt={t('SearchResultItem.avatarAlt')}
              />
              <div>
                <TimeRange from={departure.date} to={arrival.date} />
                <OperatorName>{operator.name}</OperatorName>
              </div>
            </Left>
          </Col>
          <Col xs={3} sm={3}>
            <Price amount={price} />
          </Col>
        </Row>
        <Row className='mt-2 hidden'>
          <Col md={4}>
            <h4>{t('SearchResultItem.departure')}</h4>
            <FullDate>{formatDate(departure.date)}</FullDate>
            {departure.location && <Location {...departure.location} />}
          </Col>
          <Col md={8}>
            <MapWrapper>
              {selected && departure.location && (
                <LocationMap {...departure.location} />
              )}
            </MapWrapper>
          </Col>
        </Row>

        <Row className='mt-1 hidden'>
          <Col md={4}>
            <h4>{t('SearchResultItem.destination')}</h4>
            <FullDate>{formatDate(arrival.date)}</FullDate>
            {arrival.location && arrival.location && (
              <Location {...arrival.location} />
            )}
          </Col>
          <Col md={8}>
            <MapWrapper>
              {selected && <LocationMap {...arrival.location} />}
            </MapWrapper>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default SearchResultItem;
