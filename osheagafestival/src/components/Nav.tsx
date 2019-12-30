import React from "react";
import styled from "styled-components";

import { greyDark, primary, greyLight } from "../assets/Colors";
import { reg, sm } from "./../assets/Spacing";
import * as S from "./../styledComponents";

const Nav: React.FC = () => (
  <Navbar role="navigation">
    <S.WhiteLink to="/">Home</S.WhiteLink>
    <Busbud>
      <Sponsor>Powered by</Sponsor>
      <img
        src="./assets/images/busbud-logo.png"
        alt="logo-busbud"
        height={30}
      />
    </Busbud>
    <div>Lang</div>
  </Navbar>
);

const Busbud = styled.div`
  display: flex;
`;

const Navbar = styled.nav`
  background-color: ${primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${sm} ${reg};
  box-shadow: 0px -2px 10px 2px ${greyDark};
`;

const Sponsor = styled.span`
  color: ${greyLight};
  margin-right: ${sm};
  font-weight: 300;
  font-size: 0.8em;
`;

export default Nav;
