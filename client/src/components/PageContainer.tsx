import React, { useState } from "react";
import styled from "styled-components";

import SearchContainer from "./SearchContainer";
import LocalizationBox from "./LocalizationBox";

import { Currency, Language } from "../types";
import { translations } from "../lang";

const PageContainerWrapper = styled.div`
  margin: 2rem;

  @media (max-width: 768px) {
    margin: 1rem;

    .title {
      padding: 1.5rem;
    }
  }
`;

function PageContainer() {
  const [language, setLanguage] = useState<string>(Language.EN);
  const [currency, setCurrency] = useState<string>(Currency.CAD);

  return (
    <PageContainerWrapper>
      <div className="title">
        <h1>{translations[language].title}</h1>
      </div>
      <LocalizationBox
        setLanguage={setLanguage}
        setCurrency={setCurrency}
        t={translations[language]}
      />
      <SearchContainer
        language={language}
        currency={currency}
        t={translations[language]}
      />
    </PageContainerWrapper>
  );
}

export default PageContainer;
