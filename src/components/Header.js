import React from "react";
import { DATE } from "../constants";
import moment from "moment";
import styled from "styled-components";

const Header = () => (
  <NavWrapper className="nav-wrapper">
    <span> New York </span>
    <span> > </span>
    <span> Montreal </span>
    <span style={{ fontSize: "14px" }}> {moment(DATE).format("DD MMM YYYY")} 1 adult</span>
  </NavWrapper>
);

const NavWrapper = styled.nav`
  position: sticky;
  top: 0;
  font-size: 20px;
  text-align: center;
`;

export default Header;
