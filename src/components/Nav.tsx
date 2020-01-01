import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { IntlContext } from "../contexts/IntlContext";
import { HOME } from "./../constants/Routes";

import * as S from "./StyledComponents";
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
        <FormattedMessage id="nav.home" defaultMessage="Home" />
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
        <div onClick={_evt => intlContext.setLanguage("fr")}>
          <Flag
            isSelected={intlContext.lang === "fr"}
            src="./assets/images/fr.svg"
            alt="fr"
            width={20}
          />
        </div>
        <div onClick={_evt => intlContext.setLanguage("en")}>
          <Flag
            src="./assets/images/en.svg"
            isSelected={intlContext.lang === "en"}
            alt="en"
            width={20}
          />
        </div>
      </S.FlexRow>
    </Navbar>
  );
};

const Busbud = styled.div`
  display: flex;
`;

const Flag = styled.img`
  margin-left: ${reg};
  opacity: ${(props: LanguageProps) => (props.isSelected ? "none" : "60%")};
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
