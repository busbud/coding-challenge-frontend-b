import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  align-items: center;
  background-color: #161616;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export default function Header() {
  return <StyledHeader>Header</StyledHeader>;
}
