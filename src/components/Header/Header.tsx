import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  align-items: center;
  background-color: ${props => props.theme.busbud.header.backgroundColor};
  color: ${props => props.theme.busbud.header.color};
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.busbud.header.padding};
`;

export default function Header() {
  return <StyledHeader>Header</StyledHeader>;
}
