import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Loader from 'react-loader-spinner';
import { Container } from '@material-ui/core';
import { DepartureInformation } from '../../store/departures';

interface Props {
  information: DepartureInformation;
}

const StyldInfoDisplay = styled.div`
  background-color: ${props => props.theme.busbud.card.backgroundColor};
  box-shadow: ${props => props.theme.busbud.card.boxShadow};
  display: flex;
  font-size: 2rem;
  justify-content: center;
  margin-bottom: ${props => props.theme.busbud.card.margin};
  padding-bottom: ${props => props.theme.busbud.card.padding};
  padding-top: ${props => props.theme.busbud.card.padding};
  position: relative;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  right: 30px;
  top: 5px;
`;

const StyledContainer = styled(Container)`
  position: relative;
`;

export default function InfoDisplay({ information }: Props) {
  const { originCity, destinationCity, isFetching } = information;
  if (!originCity || !destinationCity) return null;
  return (
    <StyldInfoDisplay>
      <StyledContainer>
        {originCity.name} <FormattedMessage id="to" /> {destinationCity.name}{' '}
        {isFetching && (
          <LoaderWrapper>
            <Loader
              type="Rings"
              color="#127ccb"
              height={40}
              width={40}
              visible
            />
          </LoaderWrapper>
        )}
      </StyledContainer>
    </StyldInfoDisplay>
  );
}
