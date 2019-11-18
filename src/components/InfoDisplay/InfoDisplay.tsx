import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

interface Props {
  information: any;
}

const StyldInfoDisplay = styled.div`
  background-color: ${props => props.theme.busbud.card.backgroundColor};
  box-shadow: ${props => props.theme.busbud.card.boxShadow};
  display: flex;
  font-size: 2rem;
  justify-content: center;
  margin-bottom: ${props => props.theme.busbud.card.margin};
  padding: ${props => props.theme.busbud.card.padding};
`;

export default function InfoDisplay({ information }: Props) {
  const { originCity, destinationCity } = information;
  return (
    <StyldInfoDisplay>
      {originCity.short_name} <FormattedMessage id="to" />{' '}
      {destinationCity.short_name}
    </StyldInfoDisplay>
  );
}
