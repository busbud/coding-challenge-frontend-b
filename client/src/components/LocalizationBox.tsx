import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { Currency, Language } from "../types";
import { TranslationType } from "../lang";

const LocalizationBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;

  .box {
    margin-right: 0.5rem;
  }

  .label {
    margin-right: 0.5rem;
  }
`;

interface LocalizationBoxProps {
  setLanguage: (arg0: string) => void;
  setCurrency: (arg0: string) => void;
  t: TranslationType;
}

function LocalizationBox(props: LocalizationBoxProps) {
  const { setLanguage, setCurrency, t } = props;
  const onLanguageSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    props.setLanguage(e.target.value);
  };

  const onCurrencySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    props.setCurrency(e.target.value);
  };
  return (
    <LocalizationBoxWrapper>
      <div className="box">
        <label className="label">{t.chooseCurrency}:</label>
        <select
          name="currency"
          id="currency-select"
          onChange={onCurrencySelect}
        >
          <option value={Currency.CAD}>CAD</option>
          <option value={Currency.USD}>USD</option>
          <option value={Currency.EUR}>EUR</option>
        </select>
      </div>
      <div className="box">
        <label className="label">{t.chooseLanguage}:</label>
        <select
          name="language"
          id="language-select"
          onChange={onLanguageSelect}
        >
          <option value={Language.EN}>English</option>
          <option value={Language.FR}>French</option>
          <option value={Language.ES}>Spanish</option>
        </select>
      </div>
    </LocalizationBoxWrapper>
  );
}

export default LocalizationBox;
