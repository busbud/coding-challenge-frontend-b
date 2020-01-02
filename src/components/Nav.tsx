import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { IntlContext } from "../contexts/IntlContext";
import { HOME } from "./../constants/Routes";

import * as S from "./StyledComponents";
import { greyDark, primary, greyLight } from "../assets/Colors";
import { reg, sm } from "./../assets/Spacing";
import logo from "./../assets/images/busbud-logo.png";
import flag_fr from "./../assets/images/fr.svg";
import flag_en from "./../assets/images/en.svg";

interface LanguageProps {
  isSelected: boolean;
}

const Nav: React.FC = () => {
  const intlContext = React.useContext(IntlContext);

  return (
    <Navbar role="navigation">
      <S.WhiteLink to={HOME}>
        <FormattedMessage id="nav.home" defaultMessage="Home" />
      </S.WhiteLink>
      <Busbud>
        <Sponsor>Powered by</Sponsor>
        <img src={logo} alt="logo-busbud" height={30} />
      </Busbud>
      <S.FlexRow>
        <FlagContainer onClick={_evt => intlContext.setLanguage("fr")}>
          <Flag
            isSelected={intlContext.lang === "fr"}
            src={flag_fr}
            alt="fr"
            width={30}
          />
        </FlagContainer>
        <FlagContainer onClick={_evt => intlContext.setLanguage("en")}>
          <Flag
            src={flag_en}
            isSelected={intlContext.lang === "en"}
            alt="en"
            width={30}
          />
        </FlagContainer>
      </S.FlexRow>
    </Navbar>
  );
};

const Busbud = styled.div`
  display: flex;
`;

const FlagContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Flag = styled.img`
  margin-left: ${reg};
  opacity: ${(props: LanguageProps) => (props.isSelected ? "none" : "40%")};
`;

const Navbar = styled.nav`
  background-color: ${primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${reg};
  box-shadow: 0px -2px 10px 2px ${greyDark};
`;

const Sponsor = styled.span`
  color: ${greyLight};
  margin-right: ${sm};
  font-weight: 300;
  font-size: 0.9em;
`;

export default Nav;
