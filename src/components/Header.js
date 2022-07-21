import React from 'react';

import styled from 'styled-components';

const StyledHeader = styled.header`
  padding: 40px 0;
  width: 100%;
  max-width: 1300px;
`;

const Logo = styled.img`
  height: 40px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo src="./images/logo.svg" alt="logo" />
    </StyledHeader>
  );
};
export default Header;
