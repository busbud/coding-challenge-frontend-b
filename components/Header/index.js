import React, { useContext } from "react";
import styled from "styled-components";

import { FullWidth, SiteWidth } from "../common-styled/Containers";
import { IntlContext } from "../../pages/_app";
import { getTransaltion } from "../../utils/translation";

const Wrapper = styled(FullWidth)`
  background: #1da1f2;
  align-items: center;
`;
const InnerWrapper = styled(SiteWidth)`
  align-items: center;
  flex-direction: row;
`;
const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  color: ${({ theme }) => theme.text.white};
`;
const Languages = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
const Language = styled.a`
  padding: 10px;
  color: #fff;
  cursor: pointer;
`;

export default function Header(props) {
  const { language, toggleLanguage } = useContext(IntlContext);
  return (
    <Wrapper>
      <InnerWrapper>
        <Title data-testid="header-title">{props.title}</Title>
        <Languages>
          <Language
            data-testid="header-english"
            title={getTransaltion("header.enTitle", language)}
            role="button"
            onClick={() => toggleLanguage("en")}
          >
            English
          </Language>
          <Language
            data-testid="header-french"
            title={getTransaltion("header.frTitle", language)}
            role="button"
            onClick={() => toggleLanguage("fr")}
          >
            French
          </Language>
        </Languages>
      </InnerWrapper>
    </Wrapper>
  );
}
