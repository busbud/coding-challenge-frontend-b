import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import logobusbud from "../../assets/logobusbud.png";

const Container = styled.div`
  padding: 20px;
  background: #50c4c9;
  color: white;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 100px;
  margin: 0px 10px;
  @media screen and (max-width: 1200px) {
    max-height: 60px;
  }
`;

const SwitchLanguageButton = styled.button`
  color: white;
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  display: flex;
`;

export const Header = () => {
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <LogoContainer>
        <Logo src={logo} />
        <Logo src={logobusbud} />
      </LogoContainer>
      <SwitchLanguageButton
        onClick={() =>
          i18n.changeLanguage(i18n.language === "en" ? "fr" : "en")
        }
      >
        {" "}
        {i18n.language === "en" ? "en" : "fr"}{" "}
      </SwitchLanguageButton>
    </Container>
  );
};
