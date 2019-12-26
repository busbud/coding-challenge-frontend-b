import React from "react";
import styled from "styled-components";

import { greyDark, primary } from "../assets/Colors";
import { reg } from "./../assets/Spacing";
import * as S from "./../styledComponents";

const Nav: React.FC = () => (
  <Navbar role="navigation">
    <S.WhiteLink to="/">Home</S.WhiteLink>
    <div>Lang</div>
  </Navbar>
);
const Navbar = styled.nav`
  background-color: ${primary};
  padding: ${reg};
  display: flex;
  justify-content: space-between;
  box-shadow: 0px -2px 10px 2px ${greyDark};
`;

export default Nav;
