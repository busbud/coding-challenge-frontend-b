import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { greyDark, primary, greyLight } from "../assets/Colors";
import { reg, sm } from "./../assets/Spacing";
import * as S from "./../styledComponents";
import { IntlContext } from "../i18n/IntlContext";

interface LanguageProps {
  isSelected: boolean;
}

const Nav: React.FC = () => {
  const intlContext = React.useContext(IntlContext);

  return (
    <Navbar role="navigation">
      <S.WhiteLink to="/">
        <FormattedMessage id="nav.home" description="Home" />
      </S.WhiteLink>
      <Busbud>
        <Sponsor>Powered by</Sponsor>
        <img
          src="./assets/images/busbud-logo.png"
          alt="logo-busbud"
          height={30}
        />
      </Busbud>
      <div>
        <Lang
          isSelected={intlContext.lang === "fr"}
          onClick={_evt => intlContext.setLanguage("fr")}
        >
          Fr
        </Lang>
        <Lang
          isSelected={intlContext.lang === "en"}
          onClick={_evt => intlContext.setLanguage("en")}
        >
          En
        </Lang>
      </div>
    </Navbar>
  );
};

const Busbud = styled.div`
  display: flex;
`;

const Lang = styled.a`
  border: ${(props: LanguageProps) =>
    props.isSelected ? "1px solid black" : "none"};
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
