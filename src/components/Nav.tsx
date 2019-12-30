import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { IntlContext } from "../i18n/IntlContext";
import { HOME } from "./../constants/Routes";

import * as S from "./../styledComponents";
import { greyDark, primary, greyLight } from "../assets/Colors";
import { reg, sm } from "./../assets/Spacing";

interface LanguageProps {
  isSelected: boolean;
}

const Nav: React.FC = () => {
  const intlContext = React.useContext(IntlContext);

  return (
    <Navbar role="navigation">
      <S.WhiteLink to={HOME}>
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
      <S.FlexRow>
        <Lang
          isSelected={intlContext.lang === "fr"}
          onClick={_evt => intlContext.setLanguage("fr")}
        >
          <img src="./assets/images/fr.svg" alt="fr" width={20} />
        </Lang>
        <Lang
          isSelected={intlContext.lang === "en"}
          onClick={_evt => intlContext.setLanguage("en")}
        >
          <img src="./assets/images/en.svg" alt="en" width={20} />
        </Lang>
      </S.FlexRow>
    </Navbar>
  );
};

const Busbud = styled.div`
  display: flex;
`;

const Lang = styled.a`
  margin-left: ${reg};
  img {
    opacity: ${(props: LanguageProps) => (props.isSelected ? "none" : "60%")};
  }
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
