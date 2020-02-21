import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  color: #ab216c;
  font-family: 'Quicksand', sans-serif;
  float: right;
`;

const Amount = styled.span`
  font-size: 1.5rem;
`;

const Currency = styled.span`
  font-size: 0.8rem;
  position: absolute;
  top: 3;
  left: -9px;
`;

function Price({ amount }) {
  return (
    <Wrapper>
      <Currency>$</Currency>
      <Amount>{amount}</Amount>
    </Wrapper>
  );
}

export default Price;
