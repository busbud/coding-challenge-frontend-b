import React, { useContext } from "react";
import { useTranslation, Trans } from "react-i18next";
import axios from "axios";

import i18n from "i18n";
import { AppContext } from "context";
import Container from "commons/Container";
import Select from "commons/Select";

import SearchForm from "./components/SearchForm";
import { StyledHeader, Top, Logo, Title } from "./styles";
import logo from "./logo.svg";

const Header = () => {
  const { t } = useTranslation();
  const context = useContext(AppContext);

  const handleSearch = async ({
    originCity,
    destinationCity,
    outboundDate,
    departures = [],
    poll = false,
  }) => {
    try {
      context.setLoading(true);
      context.setSearched(true);

      const url = `https://napi.busbud.com/x-departures/${originCity}/${destinationCity}/${outboundDate}?adult=1&lang=en`;
      const pollUrl = `https://napi.busbud.com/x-departures/${originCity}/${destinationCity}/${outboundDate}/poll?index=${departures.length}&adult=1&lang=en`;
      const response = await axios.get(poll ? pollUrl : url, {
        headers: {
          Accept:
            "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
          "X-Busbud-Token": process.env.REACT_APP_BUSBUD_TOKEN,
        },
      });

      const { data } = response;

      if (!data?.complete) {
        setTimeout(() => {
          handleSearch({
            originCity,
            destinationCity,
            outboundDate,
            departures: data.departures,
            poll: true,
          });
        }, 2000);
      } else {
        context.setLoading(false);
        context.setDepartures(data.departures);
        context.setLocations(data.locations);
        context.setOperators(data.operators);
        context.setCities(data.cities);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <StyledHeader>
      <Container>
        <Top>
          <Logo href="/" title="BusBud">
            <img src={logo} alt="BudBud" />
          </Logo>
          <Select
            style={{ color: "var(--white)", width: 115 }}
            defaultValue="en"
            onChange={handleLanguageChange}
            data-testid="language-select"
            bordered={false}
          >
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="fr">Français</Select.Option>
          </Select>
        </Top>
        <Title>
          <Trans>{t("headerTitle")}</Trans>
        </Title>
        <p>
          <strong>{t("headerSubtitle")}</strong>
        </p>
        <SearchForm onSearch={handleSearch} />
      </Container>
    </StyledHeader>
  );
};

export default Header;
