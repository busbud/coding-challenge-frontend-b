import React from "react";
import { useTranslation } from "react-i18next";

import { Currency } from "../../models/Currency";

import "./CurrencyDropdown.scss";
import { Dropdown } from "react-bootstrap";

interface ICurrencyDropdownProps {
  currency: Currency;
  changeCurrency: ChangeCurrency;
}

type ChangeCurrency = (currency: Currency) => void;

const currencies: Currency[] = Currency.getCurrencies();

const CurrencyDropdown: React.FC<ICurrencyDropdownProps> = ({
  currency,
  changeCurrency,
}) => {
  const { t } = useTranslation();

  return (
    <Dropdown className="currency-dropdown">
      <Dropdown.Toggle>{t(currency.keyTranslation)}</Dropdown.Toggle>
      <Dropdown.Menu>
        {currencies.map((currency: Currency, index: number) => (
          <Dropdown.Item
            onClick={() => {
              changeCurrency(currency);
            }}
            key={index}
          >
            {t(currency.keyTranslation)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CurrencyDropdown;
