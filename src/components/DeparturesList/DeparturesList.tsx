import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { FormattedNumber, FormattedTime } from 'react-intl';
import {
  AugmentedDeparture,
  DepartureInformation
} from '../../store/departures';

interface Props {
  departures: AugmentedDeparture[];
  information: DepartureInformation;
}

const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.busbud.card.padding};
`;

const StyledTime = styled.time`
  display: inline-block;
  min-width: 70px;
`;

const StyledArrow = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Location = styled.div`
  @media (min-width: 768px) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Price = styled.div`
  border-left: 1px solid ${props => props.theme.busbud.color.grey};
  font-size: 1.1rem;
  margin-left: 10px;
  padding-left: 10px;
`;

export default function Departures({ departures = [], information }: Props) {
  return (
    <Container>
      <Grid container spacing={3}>
        {departures.map(departure => {
          const {
            id,
            prices: { total, currency },
            departure_time: departureTime,
            arrival_time: arrivalTime,
            originLocationName,
            destinationLocationName
          } = departure;
          return (
            <Grid item xs={12} md={6} key={id}>
              <StyledPaper>
                <div>
                  <Location>
                    <strong>
                      <StyledTime>
                        <FormattedTime value={departureTime} />
                      </StyledTime>{' '}
                      {information.originCity.name}
                    </strong>{' '}
                    - {originLocationName}
                  </Location>
                  <StyledArrow>&darr;</StyledArrow>
                  <Location>
                    <strong>
                      <StyledTime>
                        <FormattedTime value={arrivalTime} />
                      </StyledTime>{' '}
                      {information.destinationCity.name}
                    </strong>{' '}
                    - {destinationLocationName}
                  </Location>
                </div>
                <Price>
                  <FormattedNumber
                    // eslint-disable-next-line react/style-prop-object
                    style="currency"
                    value={total / 100}
                    currency={currency}
                  />
                </Price>
              </StyledPaper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
